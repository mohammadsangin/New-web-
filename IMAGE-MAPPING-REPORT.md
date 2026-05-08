# Kymra Lighting — Image Mapping Report (Shopify theme)

## Source

Folder uploaded by user: `/Users/apple/Desktop/new images/` — 11 PNG files, 10 unique (1 byte-identical duplicate dropped).

## Where they live in the theme

All images copied into `assets/` (Shopify themes use a flat `assets/` folder — files are referenced via `{{ 'filename.png' | asset_url }}`):

```
assets/
  hero-dining.png                        ← Hero image
  product-ring-chandelier.png            ← Aurelia / large brass ring chandelier
  product-chandelier-closeup.png         ← Celeste / close-up brass chandelier
  product-ribbed-glass-pendant.png       ← Valen / single ribbed pendant
  product-alabaster-table-lamp.png       ← Elara / alabaster table lamp
  product-arc-floor-lamp.png             ← Ardent / arc floor lamp
  product-ribbed-wall-sconce.png         ← Maison / ribbed wall sconce
  product-outdoor-wall-lantern.png       ← Marlow / outdoor lantern
  product-brass-switch.png               ← Atelier / brass switch plate
  product-kitchen-island-trio.png        ← Ravello / kitchen island trio
```

## How each image is used in the theme

### Hero (`sections/hero.liquid`)
- **`hero-dining.png`** is the default fallback hero image, displayed on the right of the hero on desktop with a left-edge gradient so the headline + CTAs stay readable.
- The merchant can override it via the theme editor (`Hero` section → `Hero image` picker).

### Featured Collections (`sections/featured-collections.liquid`)
On the home page 4-up:

| Card | Asset fallback | Linked Shopify collection |
|---|---|---|
| Ceiling Lights | `product-chandelier-closeup.png` | `/collections/ceiling-lights` |
| Floor Lamps | `product-arc-floor-lamp.png` | `/collections/floor-lamps` |
| Outdoor Lighting | `product-outdoor-wall-lantern.png` | `/collections/outdoor` |
| Switches & Sockets | `product-brass-switch.png` | `/collections/switches-sockets` |

Each block has a "Collection" picker — once the merchant connects a real Shopify collection, that collection's own image takes over (the asset fallback only renders when the linked collection has no image).

### Signature Products (`sections/signature-products.liquid`)
4 product blocks pre-set with asset fallbacks for the launch:

| Status | Title | Asset fallback |
|---|---|---|
| Best Seller | Aurelia Glass Chandelier | `product-ring-chandelier.png` |
| New | Valen Smoked Glass Pendant | `product-ribbed-glass-pendant.png` |
| Limited | Nocturne Linear Island Pendant | `hero-dining.png` |
| Top Rated | Elara Alabaster Table Lamp | `product-alabaster-table-lamp.png` |

Each block has a Shopify "Product" picker — once products are created in admin and linked here, the real product images take over.

### Inspiration (`sections/inspiration.liquid`)
4 cards on the home page:

| Category | Title | Asset fallback |
|---|---|---|
| Dining rooms | Dining room, warm modern | `hero-dining.png` |
| Kitchens | Kitchen island, smoked glass trio | `product-kitchen-island-trio.png` |
| Bedrooms | Bedroom, paired wall lights | `product-ribbed-wall-sconce.png` |
| Hallways | Stairwell, double-height drop | `product-ring-chandelier.png` |

Each card supports an `image_picker` in the theme editor for full custom imagery later.

### Product detail (`sections/main-product.liquid`)
- Uses `product.featured_image` and `product.images` — falls back to `product-ring-chandelier.png` if the product hasn't been given any images.

### Cart (drawer + page)
- Uses `line_item.image` for each line item thumbnail.

### Footer / Header
- No images bound; uses CSS-built brand mark.

## Duplicates / not used

- `533038c8-...(1).png` — byte-identical to `533038c8-...png` (outdoor lantern). **Dropped from import.**

All 10 unique images are in active use. None wasted.

## Missing recommended images still needed

These are upgrades, not blockers — the theme is fully presentable today:

1. **Bathroom-specific lighting shot** (bathroom collection currently shares `product-ribbed-wall-sconce.png`)
2. **Flush-mount ceiling light** in context (currently uses chandelier close-up)
3. **Outdoor sub-categories** — dedicated photography for: Outdoor Wall, Outdoor Ceiling & Pendants, Landscape, Deck & Step, Outdoor Security (currently all share the one outdoor lantern)
4. **Hallway / corridor** scene
5. **Bedroom lifestyle** — paired wall lights flanking a bed (separate from the wall sconce close-up)
6. **Brushed bronze finish detail** — close-up shots of warm finishes for product gallery secondary slots
7. **LED strip / cabinet / step lighting** — for when the catalogue extends to architectural lighting
8. **Studio render** of a chandelier on a transparent background — would unlock a sharper hero option
9. **Product gallery extra angles** — most products have one real photo; product detail pages currently mix real + fallback for the 2nd–4th gallery images
10. **Brand / lifestyle hero alt** — second wide hero option for seasonal swaps

**Total recommended additional images: 10**

## Type of images to generate next

If you're commissioning photography, the highest-leverage shoots are:

1. **Hero alts** (1–3 wide-format dining/kitchen/lounge scenes, 16:8 or 16:7, ~2400px wide)
2. **Bathroom vanity scene** — IP-rated wall light context, 4:5 portrait
3. **Bedroom pair** — sconces flanking bed, 4:5 portrait
4. **Hallway run** — fluted wall lights along a corridor, 4:5 portrait
5. **Outdoor courtyard** — bronze lantern in landscape context, 4:5 portrait
6. **Product gallery angle 2** for each of the 10 hero pieces (cutout or warm room context, 4:5 portrait, ~1200×1500)

Aspect ratios used by the theme:
- Hero image: ~3:4 portrait works on desktop with the inner gradient. 16:9 also acceptable.
- Product cards: `aspect-ratio: 4 / 5`
- Collection cards: `aspect-ratio: 4 / 5`
- Inspiration cards: `aspect-ratio: 4 / 5`
- Blog cards: `aspect-ratio: 4 / 3`

## Verification

- `npx @shopify/cli theme check` — ✅ **51 files inspected with no offenses found.**
