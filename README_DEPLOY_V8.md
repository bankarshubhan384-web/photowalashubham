# PHOTOWALA SHUBHAM V8 — deployment

This is a targeted repair based on the uploaded `index (4).html`; the supplied smooth animations/layout are preserved.

## Public Worker
Folder: `photowala_shubham_public_v8`

```bash
npx wrangler login
npx wrangler deploy
```

Expected worker name: `photowalashubham`.

## Owner Worker
Folder: `photowala_shubham_owner_v8`

```bash
npx wrangler login
npx wrangler deploy
```

Expected worker name: `photowalashubhamowner`.

The owner dashboard, customer portal, and website editor send API requests to the public Worker endpoint so they do not depend on a separately deployed API route on the owner Worker. CORS is restricted to the public Worker origin, owner Worker origin, and existing Pages domain.

## After deployment

1. Open `https://photowalashubham.shubhambankar96214.workers.dev/api/booking?action=version`. A JSON response confirms the Worker can reach Apps Script.
2. Open `https://photowalashubham.shubhambankar96214.workers.dev/api/booking?action=booked`. The response should be JSON.
3. Open `https://photowalashubhamowner.shubhambankar96214.workers.dev/owner.html` (or the root of the owner Worker) and test sign-in.
4. Click a photo: it should open a full-screen image viewer without cropping. Use arrow keys or the on-screen controls to navigate.
5. Click a film: Drive, YouTube, Vimeo, and direct MP4/WebM links now open inside the full-viewport player. Unsupported providers show an open-original link instead of navigating away without warning.

If `/api/booking?action=version` returns an error, deploy the existing Apps Script Web App as a new version and ensure its access setting permits public web-app requests. Do not paste passwords, one-time codes, or API keys into chat.

## Important
- Keep the full folder structure intact; deploy each folder separately.
- The public Worker is the shared API/media proxy. The owner Worker is a separate site serving the owner dashboard at `/` and `/owner.html`.
- No API keys or owner passwords were added to the HTML.
- The actual external Apps Script service could not be reached from the build environment, so live upstream connectivity still needs to be confirmed using the version endpoint after deploying.
