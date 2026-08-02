# Install JustNatur theme on Shopify

## Download

Use the project root file **`JustNatur-website.zip`** (also available from this GitHub branch).

## Option A — Upload ZIP (fastest)

1. Download `JustNatur-website.zip`
2. In Shopify Admin go to **Online Store → Themes**
3. Click **Add theme → Upload zip file**
4. Select `JustNatur-website.zip` and upload
5. Click **Publish** when ready (or **Customize** first)

## Option B — Shopify CLI

```bash
shopify theme push --unpublished
```

Or connect the GitHub repo branch that contains this theme.

## After install

1. Open **Customize** and set homepage images, products, and copy
2. Assign **About** → template `page.about`
3. Assign **Contact** → template `page.contact`
4. Connect real products in Featured Products / Shop sections
5. Preview on phone + tablet (Theme Editor device switcher)

## What’s included

- Homepage, Product, Collection, Cart, Search, About, Contact, 404
- Mobile/tablet responsive layouts
- Full-bleed cart drawer + sticky checkout
- Sticky Add to Cart on product pages
- Trust/benefits strip (1 → 2×2 → 4 columns)
