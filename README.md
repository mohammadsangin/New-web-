# Kymra Lighting — Shopify theme

A premium dark-luxury Shopify theme built for Kymra Lighting. Liquid + JSON + vanilla CSS/JS — no build step required.

## Connecting via Shopify Admin

This theme is structured to be a **valid theme at the root of the connected Git branch**. Shopify reads the following at branch root:

```
layout/
templates/
sections/
snippets/
assets/
config/
locales/
```

In Shopify Admin → Online Store → Themes → Connect from GitHub:

1. Select repository `mohammadsangin/New-web-` (or wherever this theme is pushed)
2. Select the branch where this theme has been pushed to root (see `PUSH-INSTRUCTIONS.md`)
3. Connect — theme should appear in **Draft themes**
4. Click "Customize" to edit content via the theme editor

## Local development (optional)

```bash
# Install Shopify CLI once
npm install -g @shopify/cli @shopify/theme

# From this directory
shopify theme dev --store=eqjwir-jc.myshopify.com
shopify theme check
```

## Templates

| Template | Source |
|---|---|
| `index.json` | Home — composed of hero, featured-collections, threed-experience, signature-products, philosophy, inspiration, testimonials, home-faq, contact-cta |
| `product.json` | Product detail — gallery + purchase panel + accordion + recommendations |
| `collection.json` | Collection grid + sort + pagination |
| `list-collections.json` | All collections grid |
| `page.json` | Generic content pages |
| `cart.json` | Cart page |
| `search.json` | Search results |
| `blog.json` / `article.json` | Journal |
| `404.json`, `password.json` | System |

Customer templates (`account`, `login`, `register`, `addresses`, `order`, `reset_password`, `activate_account`) are Liquid (`.liquid` not `.json`) per Shopify spec.

## Theme editor

Every section has a JSON schema, so all home page content is editable via the Shopify theme customizer:

- Hero: image, eyebrow, title, subtitle, both CTAs, trust strip blocks
- Featured collections: 4 collection cards, each with a Shopify Collection picker + fallback image asset
- Signature products: 4 product blocks, each with a Shopify Product picker + fallback content
- Header: nav links + dropdowns, fully editable per Soho-style structure
- Footer: 4 link columns + newsletter + brand text
- Philosophy, Inspiration, Testimonials, FAQ, Contact CTA: all block-based

## JS

Single bundle `assets/application.js` handles:

- Cart drawer (real Shopify `/cart.js` endpoints)
- Predictive search (`/search/suggest.json`)
- Header scrolled state, dropdowns, mobile menu
- Variant selector + quantity, gallery thumbs, accordions, reveal-on-scroll

## CSS

Single stylesheet `assets/application.css`. Tokens:

- Ink `hsl(18 15% 7%)`, charcoal `hsl(20 14% 10%)`
- Cream `hsl(42 32% 92%)`, champagne `hsl(38 55% 68%)`
- Amber `hsl(32 80% 58%)`, copper `hsl(22 48% 42%)`, bronze `hsl(30 34% 32%)`
- Display: Cormorant Garamond — Body: Inter

## Shopify-specific notes

- **Status badges** read from product metafield `kymra.status` (text). Values: "Best Seller" / "New" / "Limited" / "Top Rated". Set per-product in Shopify Admin → product → metafields.
- Predictive search is built-in; no extra app required.
- Theme uses `cart.js` AJAX so the cart drawer updates without a full reload.

## Suggested Shopify collections to create

| Handle | Title |
|---|---|
| `chandeliers` | Chandeliers |
| `pendant-lights` | Pendant Lights |
| `wall-lights` | Wall Lights |
| `ceiling-lights` | Ceiling Lights |
| `table-lamps` | Table Lamps |
| `floor-lamps` | Floor Lamps |
| `outdoor` | Outdoor Lighting |
| `switches-sockets` | Switches & Sockets |
| `bathroom-lights` | Bathroom Lights |
| `featured` | Featured edit |

The Indoor/Outdoor/Price dropdowns and home Featured Collections section all reference these handles.
