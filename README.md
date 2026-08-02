# JustNatur Shopify Theme

Premium D2C Shopify Online Store 2.0 theme for **JustNatur** — a connected product experience sharing one design system across Homepage, Product, Shop, About, Contact, and Cart Drawer.

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

| Breakpoint | Width |
|---|---|
| Small mobile | ≤ 389px |
| Large mobile | 390–767px |
| Tablet portrait | 768–1023px |
| Tablet landscape | 1024–1199px |
| Laptop | 1200–1439px |
| Desktop | 1440–1679px |
| Large desktop | ≥ 1680px |

## Theme Editor

Every section, block, button label, image, video, review, timeline step, and cart drawer element is configurable in the Shopify Theme Editor.

## Cart drawer

Premium slide-out cart with product list, quantity controls, free-shipping progress, hair routine recommendation, dynamic upsells, shipping info, money-back guarantee, and sticky checkout.

## Local development

```bash
shopify theme dev
```

Assign the **About** and **Contact** page templates (`page.about`, `page.contact`) to those store pages.
