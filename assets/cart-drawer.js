/**
 * JustNatur Cart Drawer — behaviors
 * Works with Shopify Ajax Cart API when available; demo mode with placeholders.
 */

class JnCartDrawer extends HTMLElement {
  constructor() {
    super();
    this.panel = null;
    this.overlay = null;
    this.closeBtn = null;
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  connectedCallback() {
    this.panel = this.querySelector('[data-jn-cart-panel]');
    this.overlay = this.querySelector('[data-jn-cart-overlay]');
    this.closeBtn = this.querySelector('[data-jn-cart-close]');

    this.overlay?.addEventListener('click', () => this.close());
    this.closeBtn?.addEventListener('click', () => this.close());

    document.addEventListener('jn:cart:open', () => this.open());
    document.addEventListener('jn:cart:close', () => this.close());
    document.addEventListener('jn:cart:refresh', () => this.refresh());

    this.querySelectorAll('[data-jn-qty-change]').forEach((btn) => {
      btn.addEventListener('click', (e) => this.onQtyClick(e));
    });

    this.querySelectorAll('[data-jn-line-remove]').forEach((btn) => {
      btn.addEventListener('click', (e) => this.onRemove(e));
    });

    this.querySelectorAll('[data-jn-upsell-add]').forEach((btn) => {
      btn.addEventListener('click', (e) => this.onUpsellAdd(e));
    });

    this.updateProgress();
  }

  open() {
    this.classList.add('is-open');
    this.setAttribute('aria-hidden', 'false');
    document.body.classList.add('jn-drawer-open');
    document.addEventListener('keydown', this.onKeyDown);
    this.closeBtn?.focus();
    this.refresh();
  }

  close() {
    this.classList.remove('is-open');
    this.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('jn-drawer-open');
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event) {
    if (event.key === 'Escape') this.close();
  }

  async refresh() {
    try {
      const res = await fetch('/cart.js');
      if (!res.ok) return;
      const cart = await res.json();
      this.renderFromCart(cart);
    } catch (_) {
      /* Placeholder demo state when cart API unavailable */
      this.updateProgress();
    }
  }

  renderFromCart(cart) {
    const countEl = this.querySelector('[data-jn-cart-count]');
    const subtotalEl = this.querySelector('[data-jn-cart-subtotal]');
    const emptyEl = this.querySelector('[data-jn-cart-empty]');
    const linesEl = this.querySelector('[data-jn-cart-lines]');

    if (countEl) {
      countEl.textContent = cart.item_count === 1 ? '(1)' : `(${cart.item_count})`;
    }

    if (subtotalEl) {
      subtotalEl.textContent = this.formatMoney(cart.total_price);
    }

    const hasItems = cart.item_count > 0;
    if (emptyEl) emptyEl.hidden = hasItems;
    if (linesEl) linesEl.hidden = !hasItems;

    this.dataset.cartTotal = String(cart.total_price || 0);
    this.updateProgress();
  }

  updateProgress() {
    const threshold = Number(this.dataset.freeShippingThreshold || 99900);
    const total = Number(this.dataset.cartTotal || 49900);
    const fill = this.querySelector('[data-jn-progress-fill]');
    const label = this.querySelector('[data-jn-progress-label]');
    const pct = Math.min(100, Math.round((total / threshold) * 100));

    if (fill) fill.style.width = `${pct}%`;
    if (label) {
      if (total >= threshold) {
        label.textContent = this.dataset.progressComplete || 'You’ve unlocked free shipping';
      } else {
        const remaining = this.formatMoney(threshold - total);
        const template = this.dataset.progressRemaining || 'Add {{amount}} more for free shipping';
        label.textContent = template.replace('{{amount}}', remaining);
      }
    }
  }

  async onQtyClick(event) {
    const btn = event.currentTarget;
    const line = btn.closest('[data-jn-cart-line]');
    const key = line?.dataset.key;
    const input = line?.querySelector('[data-jn-qty-input]');
    if (!input) return;

    const delta = Number(btn.dataset.jnQtyChange);
    const next = Math.max(0, Number(input.value || 1) + delta);
    input.value = String(next);

    if (key) {
      await this.changeLine(key, next);
    } else {
      this.dataset.cartTotal = String(Math.max(0, Number(this.dataset.cartTotal || 0) + delta * 149900));
      this.updateProgress();
      if (next === 0) line?.remove();
    }
  }

  async onRemove(event) {
    const line = event.currentTarget.closest('[data-jn-cart-line]');
    const key = line?.dataset.key;
    if (key) {
      await this.changeLine(key, 0);
    } else {
      line?.remove();
      this.updateProgress();
    }
  }

  async changeLine(key, quantity) {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity }),
      });
      if (res.ok) await this.refresh();
    } catch (_) {
      /* no-op in offline/demo */
    }
  }

  async onUpsellAdd(event) {
    const btn = event.currentTarget;
    const id = btn.dataset.variantId;
    if (!id) {
      btn.textContent = this.dataset.addedLabel || 'Added';
      btn.disabled = true;
      return;
    }
    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id, quantity: 1 }),
      });
      if (res.ok) {
        btn.textContent = this.dataset.addedLabel || 'Added';
        btn.disabled = true;
        await this.refresh();
        this.open();
      }
    } catch (_) {
      btn.textContent = this.dataset.addedLabel || 'Added';
      btn.disabled = true;
    }
  }

  formatMoney(cents) {
    const amount = (Number(cents) / 100).toFixed(2);
    const currency = this.dataset.currency || '₹';
    return `${currency}${amount}`;
  }
}

customElements.define('jn-cart-drawer', JnCartDrawer);
