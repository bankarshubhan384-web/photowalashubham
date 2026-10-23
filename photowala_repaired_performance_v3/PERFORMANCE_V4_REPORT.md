# PHOTOWALA SHUBHAM — unified photos, film thumbnails, app icon and performance fix (v4)

## What's fixed
- Replaced all 15 stock/external photo gallery sources with the user's 15 local WebP photo assets. There are no Unsplash image URLs in the homepage.
- Added all 7 user-supplied film thumbnails as separate local WebP assets; thumbnails are lazy-loaded and no longer embedded into the HTML.
- Applied the supplied PWS square logo to the PWA install icons (192×192 and 512×512), Apple touch icon (180×180), and browser favicon (32×32). Updated the manifest and icon query versions.
- Added immutable long-term caching for versioned photo/film assets and app icons. HTML remains no-cache and `/api/*` stays no-store.
- Reduced filter/blur and repaint work on the film and photo grids. Added explicit `object-fit: contain` and viewport constraints to the full-screen photo viewer.
- Preserved Apps Script booking/backend code and Cloudflare Pages Functions; this update does not require redeploying Apps Script.

## Size / perf checks
- Homepage HTML is about 57,533 bytes (the file remains separate from images).
- New film thumbnail total: 288,530 bytes across 7 WebP images.
- 15 photo gallery thumbnails total: 452,920 bytes. Full-size WebP images are loaded only when a photo is opened.
- Showreel video remains `preload=none`.

## Deployment
Deploy the whole `photowala_repaired_performance_v3` project directory through Wrangler using the included `wrangler.toml`; the `functions/` directory must remain at the project root and `public/` is the Pages output directory. Do not upload only `index.html`.

```bash
npx wrangler login
npx wrangler pages deploy public --project-name photowalashubham
```

Use the exact existing Cloudflare Pages project name if different. Since this is a static/media change, no Apps Script deployment is needed. After deploy, hard-refresh once. If a previously installed home-screen shortcut still shows the old icon, remove that shortcut and re-add it after visiting the updated site.

## Verification performed
- JavaScript parsing, HTML asset references, manifest JSON, WebP decodes and ZIP integrity checked locally.
- Confirmed no external Unsplash photo URL remains in homepage HTML.
- Confirmed all 7 film thumbnails and 15 gallery thumbnail/full-size files are present.
- A live browser trace and live deployment were not available here, so real-world speed and production rendering must be checked after deployment.
