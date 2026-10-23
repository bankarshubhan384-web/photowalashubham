# IMPORTANT — use the unified v4 deployment guide

This package now combines the actual 15 uploaded Photo Gallery images, the 7 supplied film thumbnails, the new PWS web-app icon, and performance improvements. Follow `DEPLOYMENT_V4.md` for the correct deploy command and post-deployment checks. Do not deploy only an HTML file.

---

PHOTOWALA SHUBHAM — BOOKING / CALENDAR + PERFORMANCE REPAIR BUNDLE


## LOGO UPDATE ONLY (2026-10-22)
This release uses the uploaded SHUBHAM wordmark for the homepage, customer portal, owner editor, footer, map/gallery brand placements, favicon, PWA/app icons, and the existing `/logo.png` asset used in generated PDFs. The Apps Script `logoUrl_()` still points to `/logo.png`, so no Apps Script source change is required just for this logo update.

If the previous Drive-media/booking bundle is already deployed, redeploy this complete bundle to Cloudflare Pages using the same method you used previously. The root-level `functions/` directory and `public/` output folder remain together; do not upload `public/` alone if deploying through a method that needs Pages Functions. After deployment, hard-refresh the site and check the main header, customer portal, owner editor and a newly generated PDF. If the earlier Drive-media or booking repair was not deployed yet, follow the full setup sections below as well.


WHAT IS INCLUDED
- public/index.html: latest homepage design, centered wordmark, six themes, showreel, repaired calendar and booking UI.
- public/customer.html: customer portal using the same-site API route.
- public/website.html: owner-only full website visual editor, using the same owner session token and the same-origin API route.
- public/film.mp4: local showreel video referenced by index.html.
- public/logo.png, public/brand-icon.svg, public/assets/*, icon-192.png, icon-512.png: optimized image assets and app icons. The assets folder must be deployed alongside the HTML.
- public/manifest.webmanifest and public/sw.js: PWA metadata and a lightweight service-worker registration.
- functions/api/booking.js: Cloudflare Pages Function at /api/booking. It forwards JSON requests to your existing Apps Script deployment.
- functions/media/[id].js: image-only Cloudflare Pages Function at /media/<Drive file ID>; it proxies public Drive photos and caches them at the Cloudflare edge.
- Code.gs: repaired Apps Script backend source reconstructed from the backend file you supplied.
- public/_headers: HTML revalidation and cache rules for media.
- PERFORMANCE_REPORT.md: optimization details and verification boundary.
- wrangler.toml: Pages deployment configuration.

REPAIRS MADE
1. Main and customer pages now use same-origin /api/booking calls instead of making browser requests directly to Apps Script. This reduces redirect/CORS fragility and standardizes errors.
2. Calendar availability uses Apps Script's ?action=booked response as its single source of truth. The old direct Google Calendar API request and its exposed browser key have been removed. The calendar still renders and remains navigable if live refresh fails.
3. GET/POST requests have bounded timeouts and clearer UI error messages. A booking timeout explicitly warns that the request may have been saved, so the customer should check before trying again.
4. Booking errors re-enable the button and offer WhatsApp as a fallback.
5. The Apps Script booking request no longer rejects valid fast autofill submissions only because they completed in under four seconds; the hidden honeypot and per-phone rate limiting remain.
6. Owner notification email errors after a booking/payment/review is saved no longer make a saved action look like a failed action. API responses include ownerNotified where applicable.
7. The home page and customer portal were checked for duplicate IDs, missing in-page anchors, and inline-JavaScript syntax errors.


## GOOGLE DRIVE PHOTO STORAGE + EDGE CACHE
- Owner-page photo uploads are still saved in your Google Drive folder `Photowala website photos`. Customer PDFs/customer folders remain stored in Drive, and booking/site settings remain in Google Sheets.
- Public Drive photos are now returned to the website as same-origin `/media/<file ID>` URLs. The Cloudflare Function checks that the Drive response is an image and caches successful image responses at the edge, reducing repeated direct Google image requests.
- This route only serves images. Do not use it for customer PDFs, private files, or booking data. The booking API continues to use `no-store`.
- Deploy the new root-level `functions/media/[id].js` together with `functions/api/booking.js`. If a previous Drive image was not public, open Apps Script and run `fixPhotoSharing` once (only for images intended for the public website), then redeploy the Apps Script Web App.

## PERFORMANCE OPTIMIZATIONS
- The homepage HTML was reduced from about 1.45 MB to about 566 KB (roughly 61% smaller) by moving embedded raster images to static assets and reusing duplicate portraits/logos.
- The portrait and showreel poster are optimized WebP images; payment QR files are externalized without changing their original bytes.
- Images decode asynchronously; below-the-fold images load lazily. The showreel MP4 remains `preload="none"` so it is not fetched until playback.
- Full-screen ambient particles are capped at about 24 fps with fewer particles and lower canvas pixel density.
- Expensive backdrop blur layers are removed while translucent card fills, borders and shadows remain; this significantly reduces repaint/compositing cost during scroll.
- Lower sections use `content-visibility:auto` where supported. The owner editor preview iframe is lazy-loaded so it does not automatically start loading another full copy of the homepage on editor startup.
- Static assets use short cache headers and HTML is revalidated, helping repeat visits without making booking/API responses cacheable.

IMPORTANT: DEPLOY THE NEW EDITOR, SITE FILES, FUNCTION AND APPS SCRIPT SCHEMA
The expanded editor needs all three parts updated: `public/website.html`, the updated `public/index.html`, and the updated Apps Script `Code.gs`. Publish a new Apps Script Web App version after replacing Code.gs. Keep the existing Apps Script URL and Script Properties.

IMPORTANT: DEPLOY THE FUNCTION, NOT JUST STATIC FILES
The homepage's API route is /api/booking. That route only exists after the Cloudflare Pages Function is deployed. A static-only drag-and-drop upload of the contents of public/ will NOT deploy functions/api/booking.js.

Recommended Git-connected deploy:
- Put this bundle in the repository root (keep functions/ at the root and public/ as the output directory).
- In Cloudflare Pages build settings, leave the build command blank and set the output directory to public.
- Commit/push. Do not put functions/ inside public/.

Alternative Wrangler Direct Upload:
- Install/use Node.js and run these commands from this bundle's root directory:
    npx wrangler login
    npx wrangler pages deploy public --project-name photowalashubham
- If Cloudflare shows a different exact Pages project name in your dashboard, use that exact name in the command. Wrangler needs the root-level functions/ directory to deploy the route as part of this project.
- After deployment, test https://YOUR-SITE/api/booking?action=booked; it should return JSON with ok, slots, pending and booked.

UPDATE THE APPS SCRIPT BACKEND SEPARATELY
The Pages Function forwards to the Apps Script URL already present in functions/api/booking.js. The backend source is Code.gs. To apply the backend fixes:
1. Open the existing Apps Script project.
2. Replace the existing backend source with Code.gs and save.
3. Deploy > Manage deployments > edit the existing Web App deployment and publish a new version. Keep the existing Web App URL; the Pages Function forwards to it.
4. Keep Script Properties such as OWNER_KEY, AI keys and Razorpay credentials inside Apps Script. They are not included in this bundle and should never be pasted into HTML.

POST-DEPLOY VERIFICATION
1. Open /api/booking?action=version and check the JSON response; it should include connected status fields.
2. Open /api/booking?action=booked. Confirm JSON returns successfully.
3. On the homepage, change calendar months, select an available date, and confirm the date is copied to the booking form.
4. Try submitting with required fields blank; the page should show validation and not send a request.
5. Before a real booking test, be ready for a real row to be added to the live Google Sheet. Submit only once and check the owner dashboard/Sheet before retrying after a timeout.
6. Confirm film.mp4 plays from /film.mp4. Ensure each Google Drive film has appropriate viewing permission.
7. Open `/website.html` from the owner dashboard. Use the preview to click text, links and images/videos, then use section visibility, theme, metadata and custom CSS controls. Press Save all changes to publish.
8. Test customer login and email OTP, payment receipt, and review only after the homepage and API route return successfully.

LIMITATIONS
I cannot publish to your Cloudflare account or redeploy Apps Script from this chat. Static/code checks passed, but I could not execute a real booking, deliver an OTP email, make a payment, or validate Google Drive playback in your live accounts. The proxy does not grant missing Google permissions or repair missing Apps Script deployment authorization.


## PERFORMANCE PASS V3 (2026-10-22)
- Homepage inline CSS moved to `/assets/site-v3.css` in original cascade order; body runtime scripts moved to `/assets/site-runtime-v3.js` and deferred until parsing is complete. Both files use versioned filenames and long-lived browser cache headers.
- Google Fonts stylesheet is now non-blocking and preconnected; Google Analytics starts after page load/idle.
- Removed the global scroll-triggered blur event handler that toggled costly filter effects on multiple large page elements.
- Ambient particles no longer run automatically, on touch devices, or on Save-Data connections; selecting a non-Auto ambience manually still enables the effect on desktop.
- Automatic photo carousel motion and scroll-reveal animations are disabled on touch/Save-Data devices; manual carousel controls stay active.
- Mobile/touch CSS avoids carousel blur filters and hover transforms. Booking API, calendar, Drive media route, customer files and owner settings remain unchanged.

- The `/api/booking` function caches only successful public GETs for `action=site` and `action=reviews` at Cloudflare edge for 30 seconds. Booking availability, customer data/PDFs, all POSTs and owner actions remain uncached. Successful owner website saves/uploads invalidate these public cache keys in the current edge location; other locations naturally expire within 30 seconds.

## Photo gallery / full-screen viewer update
This release includes 15 locally optimized WebP gallery photos and the desktop/mobile lightbox fix. Deploy the whole Pages bundle (including `functions/`) as usual. No Apps Script update is required for this front-end photo/lightbox change. After deployment, test the Photos filters, click photos on desktop, swipe/arrow navigation, and portrait/landscape full-screen views on mobile.
