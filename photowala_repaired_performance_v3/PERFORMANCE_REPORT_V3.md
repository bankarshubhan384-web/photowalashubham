# PHOTOWALA SHUBHAM — Performance pass V3

## Changes
- Homepage HTML source is now 59,735 bytes (previously 566,378 bytes in the current logo/Drive bundle). Inline CSS is a single cacheable stylesheet; inline runtime scripts are one deferred, cacheable JS file.
- Deferred runtime executes the original inline scripts in source order after HTML parse; the early theme bootstrap, site WhatsApp config and JSON-LD remain inline.
- Google Fonts CSS is non-render-blocking and uses preconnect; Google Analytics loads at idle/after page load.
- Removed the scroll event handler that continually toggled a page-wide motion-blur class.
- Auto ambient particle animation, auto photo carousel motion and reveal animations are disabled on touch/Save-Data devices. Manual photo carousel controls and desktop manual mood effects remain available.
- Versioned site CSS and runtime files receive a one-year immutable browser cache. Only public `action=site` and `action=reviews` GETs are cached at the Cloudflare edge for 30 seconds; booking availability, private customer data, PDFs, owner/auth actions and all POSTs stay uncached. Successful owner saves/uploads invalidate public content cache locally.
- Showreel stays `preload=none`; image-only `/media/<id>` Drive proxy still caches public images at Cloudflare edge; private customer documents remain excluded.

## Before/after local source sizes
- Existing homepage HTML: 566,378 bytes
- New homepage HTML: 59,735 bytes
- Extracted CSS: 366,828 bytes
- Extracted runtime JS: 138,733 bytes

## Validation boundary
This is a code-level performance pass. The HTML/script syntax, CSS parse, local asset paths, duplicate IDs and package structure are checked below. I could not run a real mobile browser profile or deploy to Cloudflare from this environment, so live Core Web Vitals and real-world speed are not claimed.

- Customer portal CSS/runtime and owner editor CSS/runtime are also externalized into versioned cacheable files, preserving their script order and keeping the first theme bootstrap inline.
