# Performance optimization report — PHOTOWALA SHUBHAM

## What was optimized
- Homepage HTML: 1,454,447 bytes before the pass, 566,162 bytes after it (about 61% less HTML to transfer and parse).
- Portrait and showreel poster now use optimized WebP assets instead of large embedded base64 payloads.
- Duplicate logo references reuse one cacheable file. Payment QR files are now separate assets so the large image bytes are not included in every homepage HTML response; both QR source files were preserved byte-for-byte.
- Non-critical images decode asynchronously and load lazily; the hero portrait is marked high priority.
- The 6.1 MB showreel remains `preload="none"`, so the video is not fetched until playback.
- Decorative canvas animation is capped at roughly 24 fps, with at most 42 particles on coarse-pointer devices and 96 on desktops. Canvas pixel density is lower.
- Expensive blur compositing was removed from glass surfaces; translucent fills, borders and shadows remain. The desktop nav keeps a subtle blur.
- Browser-supported `content-visibility:auto` allows the browser to skip painting lower sections until needed.
- The owner editor preview iframe is lazy-loaded.
- `public/_headers` enables revalidation for HTML, caching for image/video assets, and `no-store` for API responses.

## Output assets
- `brand-wordmark.webp` — 3,610 bytes
- `davinci-resolve.webp` — 19,884 bytes
- `hero-portrait.webp` — 63,618 bytes
- `payment-google-pay.jpg` — 81,821 bytes
- `payment-phonepe.jpg` — 112,282 bytes
- `showreel-poster.webp` — 61,302 bytes

## Validation boundary
HTML/JavaScript syntax and local asset references were checked. Chromium blocked navigation to the local test server with `ERR_BLOCKED_BY_ADMINISTRATOR`, so no full browser runtime or live mobile performance test is claimed. The files have not been deployed to Cloudflare from this chat.

## Google Drive storage with Cloudflare edge delivery
- Website photo uploads continue to be stored in the `Photowala website photos` folder in Google Drive. Customer PDFs and per-customer folders remain stored in Drive; bookings/site settings remain in Google Sheets.
- Added `functions/media/[id].js`, a same-origin `/media/<Drive file ID>` route. It serves only public image content, caches successful image responses at Cloudflare's edge, and never proxies arbitrary URLs.
- Existing Drive image URLs in saved hero/about/gallery/media settings are normalized to `/media/<id>` when the site settings are read. New editor uploads return the same cacheable route.
- The booking API route stays `Cache-Control: no-store`; private customer documents are not exposed through the media route. Films continue using the existing player links / Cloudflare showreel asset rather than being proxied through the image-only endpoint.
- First visit/edge cache miss still fetches the public image from Google; repeat requests served from cache should reduce repeated origin requests. This is a code-level optimization, not a measured live latency claim.


## Branding update (20261022-shubham-logo)
- Replaced the website wordmark asset with the exact uploaded logo, cropped to its transparent bounds.
- Replaced both PWA icons and the SVG favicon with variants derived from the uploaded mark.
- Updated the customer portal navigation to use the new wordmark and synchronized the root/public copies of the HTML pages.
- Added cache-busting query versions to logo, favicon, wordmark, and app-icon references.
- Updated PWA theme/background colors to match the rose logo on a black background.
