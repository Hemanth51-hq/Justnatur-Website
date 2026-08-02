# JustNatur Shopify Theme

Premium D2C Shopify Online Store 2.0 theme for **JustNatur** — a connected product experience sharing one design system across Homepage, Product, Shop, About, Contact, and Cart Drawer.

## Download for Shopify

**`JustNatur-website.zip`** in the project root — upload it in Shopify Admin → Online Store → Themes → Add theme → Upload zip file.

See [INSTALL.md](./INSTALL.md) for full install steps.

## Design system

**Typography**
- Fraunces (display) — weights 500 / 600 / 700
- Plus Jakarta Sans (body / UI) — weights 400 / 500 / 600 / 700

**Colors**
| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#FAFAF7` | Page background |
| `--color-surface` | `#FFFFFF` | Cards / panels |
| `--color-text` | `#1A1C19` | Primary text |
| `--color-muted` | `#5C6358` | Secondary text |
| `--color-accent` | `#1F6B4F` | Brand green |
| `--color-accent-soft` | `#E7F2EC` | Soft mint |
| `--color-highlight` | `#C45C26` | Burnt orange |
| `--color-border` | `#D9DED6` | Borders |

Supporting tones for overlays, stars, footer accents, and sage gradient washes are defined in `assets/design-tokens.css`.

**Atmosphere**
- Body: green + orange radial washes over cream
- Hero: deep green / warm brown layered overlays
- Sections: soft sage-to-cream diagonal gradients
- Shadows: soft diffused elevation + green-tinted button glow

## Responsive breakpoints

Intentionally redesigned at each viewport — not a shrunk desktop layout:

| Breakpoint | Width | Layout notes |
|---|---|---|
| Small mobile | ≤ 389px | 1-col products, stacked CTAs, full-width cart drawer |
| Large mobile | 390–767px | 1–2 col grids, swipeable cart upsells, sticky ATC |
| Tablet portrait | 768–1023px | 2×2 benefits/trust, 2-col shop, hamburger nav |
| Tablet landscape | 1024–1199px | Desktop nav, 3-col shop, side-by-side splits |
| Laptop | 1200–1439px | 4-col featured, wider cart panel |
| Desktop | 1440–1679px | Full editorial rhythm |
| Large desktop | ≥ 1680px | Expanded content max widths |

Mobile/tablet specifics:
- Cart drawer is **full-bleed on phones** with a sticky checkout footer + safe-area padding
- Trust/benefits strip: **1 → 2×2 → equal columns** with soft dividers
- Product grids stay single-column under ~480px so titles and Add buttons remain tappable
- Sticky add-to-cart appears on product pages after the buy box scrolls away

## Theme Editor

Every section, block, button label, image, video, review, timeline step, and cart drawer element is configurable in the Shopify Theme Editor.

## Cart drawer

Premium slide-out cart with product list, quantity controls, free-shipping progress, hair routine recommendation, dynamic upsells, shipping info, money-back guarantee, and sticky checkout.

## Local development

```bash
shopify theme dev
```

Assign the **About** and **Contact** page templates (`page.about`, `page.contact`) to those store pages.
