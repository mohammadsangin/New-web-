# Kymra Lighting — Shopify theme

Premium, editorial Online Store 2.0 theme for Kymra Lighting (solid brass, period & Art Deco).
Production Liquid + vanilla CSS + vanilla JS. No frameworks, no build step, one stylesheet,
one deferred script. Mobile-first, Core Web Vitals focused.

## Structure

```
assets/     base.css · theme.js
config/     settings_schema.json · settings_data.json
layout/     theme.liquid · password.liquid
locales/    en.default.json
sections/   header · footer · announcement-bar · hero · featured-collection
            shop-the-room · trust-band · cart-drawer · main-product
            main-collection · main-cart
snippets/   icon · responsive-image · price · product-card · nav-mega-link
templates/  index · product · collection · cart (JSON) + page, search,
            list-collections, blog, article, 404, gift_card, password,
            page.contact and customers/*
```

## Design system

Design tokens live in `:root` (assets/base.css) and are driven by Theme Editor
settings (colours + fonts) via `layout/theme.liquid`. Signature = 1px brass
hairline system + small-caps eyebrow with a leading brass rule. Fonts are served
from Shopify's hosted library with `font-display: swap` — no third-party font
requests (UK GDPR + speed).

## Cart

The cart drawer is a **section** (`sections/cart-drawer.liquid`), rendered globally
in the layout, so it can be re-rendered live via the Section Rendering API after
AJAX `/cart/add.js` and `/cart/change.js` calls. Checkout is Shopify's own.

## Mega menu

`sections/header.liquid` auto-selects the mega-menu layout per top-level item:
- **Image tiles** when ≥2 "Mega menu image tile" blocks target that item.
- **Grouped columns** when the linklist has 3-level nesting (column head = 2nd
  level, links = 3rd level).
- **Simple columns** otherwise. An optional single side-promo block is supported.

IP44 tags are added automatically to menu links whose title contains "IP44" or
"Bathroom".

## Editor-driven content

No merchandising, product IDs or collection handles are hardcoded. Configure
collections, menus, imagery and copy in the Theme Editor. The home page ships
with sensible presets in `templates/index.json`.

## Honest placeholders (confirm before launch)

- **Free UK delivery threshold** — set to £300 (Theme settings → Cart). Confirm
  the figure and it flows to the announcement bar, trust band, PDP trust line and
  the cart drawer free-delivery progress note.
- **Contact** — phone `0333 090 0045`, email `sales@kymralighting.co.uk`,
  registered office `3rd Floor, 86–90 Paul Street, London EC2A 4NE` (the only
  public address). Editable in Theme settings → Contact.
- Product-level copy in `templates/product.json` accordions is generic and should
  be replaced per product (or driven by metafields).

## Local development

```bash
npm i -g @shopify/cli@latest
shopify theme dev   --store kymralighting.myshopify.com   # local preview
shopify theme check                                        # lint
shopify theme push  --unpublished                          # upload as a draft
```

Verified with `@shopify/theme-check-node`: **0 errors, 0 warnings**.
