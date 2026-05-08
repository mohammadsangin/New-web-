# Push instructions — Kymra Lighting Shopify theme

The theme files are at the **root of `kymra-lighting-shopify/`** on your local machine. To connect via Shopify Admin, the same files must sit at the **root of the GitHub branch** you select.

## Option A — Push to a new branch on the existing repo `mohammadsangin/New-web-`

This is the recommended option since the Shopify Admin already has that repo connected.

```bash
cd "/Users/apple/new folder/kymra-lighting-shopify"

# Initialise a clean git history just for the theme
git init
git checkout -b shopify-theme

# Add the GitHub remote
git remote add origin git@github.com:mohammadsangin/New-web-.git
# or HTTPS:
# git remote add origin https://github.com/mohammadsangin/New-web-.git

git add .
git commit -m "Kymra Lighting Shopify theme — initial"

# Push as a fresh orphan branch
git push -u origin shopify-theme
```

Then in Shopify Admin → Online Store → Themes → Add theme → Connect from GitHub:

1. Repository: **`mohammadsangin/New-web-`**
2. Branch: **`shopify-theme`** ← select this one
3. Click **Connect** — the "Branch isn't a valid theme" error will not appear because every required folder (`layout/`, `templates/`, `sections/`, `snippets/`, `assets/`, `config/`, `locales/`) is at the root of this branch.

The theme will appear in **Draft themes**. From there, click **Customize** to edit content via the theme editor.

## Option B — Use a brand new repo

If you'd rather keep this theme isolated from the existing repo:

```bash
cd "/Users/apple/new folder/kymra-lighting-shopify"
git init
git remote add origin git@github.com:mohammadsangin/kymra-lighting-shopify.git
git add .
git commit -m "Kymra Lighting Shopify theme — initial"
git branch -M main
git push -u origin main
```

Then in Shopify Admin → connect from GitHub → select `kymra-lighting-shopify` → branch `main`.

## Option C — Upload as ZIP (no GitHub)

If GitHub keeps fighting you:

```bash
cd "/Users/apple/new folder"
zip -r kymra-lighting-shopify.zip kymra-lighting-shopify -x "*.DS_Store" -x "*/node_modules/*"
```

Then Shopify Admin → Online Store → Themes → Add theme → Upload zip file → select `kymra-lighting-shopify.zip`.

## After connecting

1. Open the theme **Customize** editor
2. **Header** section — verify the nav blocks render correctly. The defaults match the spec: Featured · Brands · Indoor · Outdoor · Price · Reviews · About Us · Contact Us, with full dropdowns for Indoor / Outdoor / Price.
3. **Featured Collections** section — assign a real Shopify collection to each of the 4 blocks (Ceiling Lights, Floor Lamps, Outdoor Lighting, Switches & Sockets). Until then, the asset fallback images render.
4. **Signature Products** section — assign 4 real Shopify products. Until then, the asset fallback cards render.
5. **Hero** — replace the default `hero-dining.png` if you want to upload a higher-resolution master via the image picker.

## Required Shopify content

Create these collections in Admin → Products → Collections (handles must match the navbar links):

- `featured`, `chandeliers`, `pendant-lights`, `ceiling-lights`, `wall-lights`, `table-lamps`, `floor-lamps`, `bathroom-lights`, `outdoor`, `outdoor-wall`, `outdoor-ceiling`, `landscape`, `deck-step`, `outdoor-security`, `switches-sockets`

Create these pages (Admin → Online Store → Pages):

- `brands`, `about`, `contact`, `inspiration`, `reviews`, `studio`, `faq`

Without these the navigation links will return 404. The theme still renders — only the URLs need to exist as real Shopify objects.

## Optional

- `BUILD INFO`: `npx @shopify/cli theme check --path .` — currently passes 51 files with zero offenses.
- `LOCAL DEV`: `npx @shopify/cli theme dev --store=eqjwir-jc.myshopify.com` — runs a local preview (requires Shopify CLI authentication).
