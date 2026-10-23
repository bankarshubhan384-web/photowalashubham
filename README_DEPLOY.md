# PHOTOWALA SHUBHAM — Public website V7

This package fixes the photo and film lightbox click issue and includes `preview.html` for the owner website editor.

## Deploy to the existing public Worker
From this folder, run:

```bash
npx wrangler login
npx wrangler deploy
```

Confirm Wrangler is connected to the intended account. `wrangler.toml` targets the existing Worker named `photowalashubham`.

Do not upload only `index.html`: the photos, film thumbnails, showreel, logo, icons, and Worker API/media router must be deployed together.

## What was changed
- Removed pointer capture on the photo and film carousel parent elements. Capturing on a parent was retargeting clicks away from the actual card, preventing the viewer's delegated click handlers from running.
- The photo lightbox keeps the entire image visible using `contain` sizing.
- The film viewer fills the viewport, supports Google Drive previews and direct MP4/WebM links, and exposes an open-original link if an embed cannot play.
- `preview.html` gives the owner editor a same-origin preview frame.

## QA
Worker route and static files are included. Live Drive permissions and Apps Script availability must be tested after deployment.
