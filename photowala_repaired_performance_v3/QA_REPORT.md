# PHOTOWALA SHUBHAM — repair, editor and performance verification report

## Booking and editor fixes retained
- Homepage and customer portal use same-origin `/api/booking` calls; the Pages Function proxies to the existing Apps Script web app.
- Calendar availability has one source of truth (`?action=booked`) and does not expose a direct browser Google Calendar API key.
- Calendar remains navigable when availability refresh fails; API reads/writes have timeout and error handling.
- Booking error handling restores the submit button, offers WhatsApp fallback, and warns not to repeat a request immediately after a timeout.
- Apps Script no longer rejects fast autofill requests solely because they finished under four seconds. Owner notification mail failure after a saved booking/payment/review does not misreport the saved action as failed.
- `public/website.html` offers click-to-edit content/media/link controls, section visibility, theme, metadata, and custom CSS controls. Changes require the existing owner-auth session and backend save action.

## Performance changes
- Homepage HTML was about 1,454,447 bytes before optimization and is now about 566,162 bytes, a reduction of roughly 888 KB / 61%.
- Embedded images were moved to `/assets/`; the portrait and poster are WebP, repeated logos reuse one file, and payment QR files are separated from HTML. QR JPEG bytes are preserved exactly.
- Added `decoding="async"` and lazy loading for below-the-fold images. The portrait is high priority; the 6.1 MB showreel keeps `preload="none"`.
- Full-screen particle loop is limited to about 24 fps, particle counts are capped, and canvas pixel density reduced.
- Costly `backdrop-filter` layers are disabled; translucent fills/borders/shadows are preserved, while the desktop navbar retains subtle blur.
- Added `content-visibility:auto` for long lower sections and lazy loading of the editor's homepage preview iframe.
- Added `public/_headers` with revalidation for HTML and cache rules for images/video; `/api/*` remains `no-store`.

## Local static checks performed after optimization
- `public/index.html`: all 24 executable inline JavaScript blocks pass Node syntax checks; no base64 raster images remain in the HTML; required local asset paths resolve.
- `public/customer.html`: both inline executable JavaScript blocks pass Node syntax checks; required local asset paths resolve.
- `public/website.html`: all 3 inline executable JavaScript blocks pass Node syntax checks; the site preview iframe is marked `loading="lazy"`.
- `functions/api/booking.js` passes ES module syntax checks; `Code.gs` passes Node syntax checking when checked as JavaScript.
- All six externalized assets are present. The two QR images are byte-for-byte copies of their source payloads.

## Not live-tested
- No Cloudflare deployment or authenticated live booking was performed from this environment.
- A full Playwright browser navigation could not run against the local test server because Chromium blocked the local connection with `ERR_BLOCKED_BY_ADMINISTRATOR`; therefore there is no claim of live-device performance or real backend regression testing.
- Apps Script availability, booking insertion, owner email delivery, OTP, payments, Google Drive video playback, and external image requests still need confirmation after deployment.

## Deployment reminders
1. Deploy the entire Pages output folder `public/`, including `public/assets/`, `public/_headers`, the function at repository-root `functions/api/booking.js`, and `public/website.html`.
2. Keep `functions/` at repository root, not inside `public/`; static-only drag/drop will not publish the function.
3. Test `/api/booking?action=version` and `/api/booking?action=booked`.
4. Confirm calendar month changes and date selection. Submit no more than one planned test booking and check the Sheet before retrying.
5. Reopen `/website.html`, check owner authentication, and test a harmless preview edit followed by Save all changes.

## Google Drive media caching update
- Added root-level Pages Function route `functions/media/[id].js`.
- Route validates IDs, permits only GET/HEAD, rejects non-image upstream responses, and adds browser/CDN cache headers only to successful public images.
- Apps Script image URLs now normalize to same-origin `/media/<id>` on read and new uploads; Drive permissions are set only for website image files intentionally used publicly.
- `/api/booking` response caching remains disabled. Private records/PDFs are not exposed by `/media`.
- Verification is source/syntax-based; live Drive permissions, image delivery and edge cache hits still require deployment and a real browser check.


## Branding update
- Uploaded logo was cropped to its alpha bounds and installed as `logo.png` and the shared `brand-wordmark.webp`.
- Old gold camera emblem in the SVG favicon and 192/512 app icons was replaced by the submitted SHUBHAM mark.
- Customer navigation uses the new horizontal wordmark; root and public HTML copies are synchronized.
- Added cache-busting logo/icon URL versions and updated PWA rose/black colors.
- Booking, Drive media proxy and Apps Script source were not modified for this logo-only pass.


## Performance V3 static checks
- Homepage inline style blocks extracted: 42
- Deferred runtime source blocks combined: 20 (removed scroll-motion blur handler)
- Homepage HTML bytes: 566,378 -> 59,735
- CSS parse: rules 2436
- Runtime JS: `node --check` passed
- Duplicate HTML IDs: none
- Referenced local assets: all present
- Booking API and Drive media Pages Functions: present
- Browser/device profiling and live deployment: not performed in this environment

- API edge cache is allowlisted to public GET `site`/`reviews`; other API actions retain `no-store`.

- Customer and owner HTML now use external versioned CSS/runtime files; script syntax checks passed and duplicate IDs are absent.


## Photo gallery/full-screen verification
- 15 supplied photographs converted into lazy-loaded WebP thumbnails and full-view WebP assets.
- All image paths in gallery markup resolve to files under `public/assets/photos/`.
- Lightbox override forces viewport sizing and `object-fit: contain`; does not stretch or crop source images.
- Gallery JavaScript uses native dialog where available and includes a fullscreen fixed-overlay fallback.
- `site-runtime-v3.js` and `site-v3.css` cache versions were bumped in index references.
