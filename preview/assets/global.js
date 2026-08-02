/**
 * JustNatur — global behaviors
 */

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('.jn-reveal');
  if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* Carousel controls */
  document.querySelectorAll('[data-jn-carousel]').forEach((root) => {
    const track = root.querySelector('[data-jn-carousel-track]');
    const prev = root.querySelector('[data-jn-carousel-prev]');
    const next = root.querySelector('[data-jn-carousel-next]');
    if (!track) return;

    const scrollBySlide = (dir) => {
      const slide = track.querySelector('.jn-carousel__slide');
      const amount = slide ? slide.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
      track.scrollBy({ left: dir * amount, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    prev?.addEventListener('click', () => scrollBySlide(-1));
    next?.addEventListener('click', () => scrollBySlide(1));
  });

  /* Header scroll state */
  const header = document.querySelector('[data-jn-header]');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile nav */
  const navToggle = document.querySelector('[data-jn-nav-toggle]');
  const navPanel = document.querySelector('[data-jn-nav-panel]');
  if (navToggle && navPanel) {
    const setOpen = (open) => {
      navToggle.setAttribute('aria-expanded', String(open));
      navPanel.hidden = !open;
      document.body.classList.toggle('jn-nav-open', open);
    };
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
    });
    navPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });
  }

  /* Publish cart open events from any trigger */
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-jn-cart-open]');
    if (!trigger) return;
    event.preventDefault();
    document.dispatchEvent(new CustomEvent('jn:cart:open'));
  });

  /* Sticky ATC — show after buy box scrolls out of view */
  const stickyAtc = document.querySelector('[data-jn-sticky-atc]');
  if (stickyAtc && 'IntersectionObserver' in window) {
    const selector = stickyAtc.getAttribute('data-observe') || '.section-product-main';
    const targets = selector
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .flatMap((s) => Array.from(document.querySelectorAll(s)));

    if (targets.length) {
      const sync = (entry) => {
        const visible = entry.isIntersecting;
        stickyAtc.classList.toggle('is-visible', !visible);
        stickyAtc.setAttribute('aria-hidden', String(visible));
      };
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach(sync);
        },
        { rootMargin: '-12% 0px 0px 0px', threshold: 0 }
      );
      targets.forEach((el) => io.observe(el));
    }
  }
})();
