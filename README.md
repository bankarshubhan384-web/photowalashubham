# PHOTOWALA SHUBHAM — Full Website Editor + ChatGPT V10

This release adds full visual editing to the existing website, based on the uploaded `index (4).html`. The homepage animation code is preserved; the gallery runtime is adjusted so the owner can edit all 15 photos and all 7 film thumbnails instead of duplicating the static gallery.

## What the editor can change
- ChatGPT-style targeted website edits: describe only the change you want. AI returns a small list of edit operations. Nothing is saved until you review the live preview and press **Save all changes**.
- Click any text, image, video, logo, link, card or section in the same-origin preview and edit text, image/video URL, link destination, alt text, colors, font size/weight, alignment, corners, padding, margin, width, and other styling.
- Full thumbnail-driven manager for every photo and film: upload/replace imagery, full-size photo URL, categories, title, alt text, video link, film thumbnail, reordering and removal.
- Six colour themes; section show/hide; packages/pricing; contact numbers; browser/SEO title and description; custom CSS; direct CSS-selector overrides for text/media/links; JSON export/import.
- Images uploaded from the editor are compressed in the browser and stored in the existing `Photowala website photos` Google Drive folder through the current Apps Script handler. The Apps Script request guard allows the compressed upload payload (up to roughly 5.9 MB of JSON) while retaining smaller limits for normal booking requests.

## Deploy the public Worker
Extract `photowala_shubham_public_v10.zip`, open the extracted `photowala_shubham_public_v10` folder in Terminal and run:

```bash
npx wrangler login
npx wrangler deploy
```

This targets the existing Worker named `photowalashubham`.

## Deploy the owner Worker
Extract `photowala_shubham_owner_v10.zip`, open the extracted `photowala_shubham_owner_v10` folder and run:

```bash
npx wrangler login
npx wrangler deploy
npx wrangler secret put OPENAI_API_KEY
```

When asked, paste the API key **directly into Terminal**. Do not paste it into the website editor, website code or chat. The key is kept as a Cloudflare server secret and is never sent to the browser. OpenAI API access/billing is separate from a ChatGPT subscription. Without the secret the visual editor still works; the AI route will show `ai_not_configured`.

## Update the Google Apps Script backend (required for full edit access)
The existing backend stores the website settings in the `Site` sheet but the old sanitizer drops visual-editor override maps. This package includes a revised `Code.gs` that retains `design`, `sections`, `contentMap`, `mediaMap`, `linkMap`, `attrMap` and `styleMap`, plus film thumbnails, photo full-size URLs and titles.

1. Make a backup copy of the current Apps Script code first.
2. Open the Apps Script project attached to your current website backend.
3. Replace the source with `AppsScript/Code.gs` from the package, save it, then create a **new version** of the existing Web App deployment. Keep the same `/exec` deployment URL so Worker routing continues to work.
4. Test the existing booking flow, owner login, customer page and editor before making more content changes.

This source was reconstructed from the uploaded `code web.html` and syntax-checked as JavaScript; run your normal Apps Script setup/permissions checks before publishing. It is a backup-friendly update to the current backend, not a separate database.

## AI safety and behavior
- The owner token is checked against the existing Apps Script owner-auth handler before the Worker makes a model request.
- AI is permitted to stage site-content, selector, style, visibility, photo, film and package edits; it is not allowed to inject arbitrary JavaScript.
- AI changes remain local to the editor draft until you press Save. Use **Discard draft** to go back to the saved backend version.
- The editor's custom CSS field is an owner-only styling override. Use CSS, not JavaScript, and keep a backup before adding large rules.

## Project structure
- `public-worker/public/index.html`: current animated public site.
- `owner-worker/public/owner.html`: owner dashboard with the current sign-in flow.
- `owner-worker/public/website.html`: expanded visual editor and ChatGPT panel.
- `owner-worker/public/preview.html`: same-origin preview bridge for click-to-edit.
- `AppsScript/Code.gs`: extended persistence sanitizer while preserving existing booking/payment handlers.
- `src/worker.js`: same-origin Apps Script proxy, owner-only AI endpoint, media proxy and static asset routing.

## Post-deploy test checklist
1. Open the public Worker homepage and confirm animation, photo and film sections still display.
2. Open the owner Worker root, sign in, go to **Website editor**.
3. Click an image/text/link in Visual editor; stage one change and confirm it appears in preview.
4. Change one photo title and one film thumbnail, save, reload the public page and verify.
5. In Ask ChatGPT, request a small change. If unconfigured, run `npx wrangler secret put OPENAI_API_KEY` from the owner-worker project folder and redeploy.
6. Test a booking calendar query, an owner login and a customer login before using the site publicly.
