const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyRVsEC8gBr2D3bb1H3A97jyJWwLPWk_xsBV-iLHtynErfNGRF_bYfTnYUYjLUpTxvz8g/exec";
const ALLOWED_WEB_ORIGINS = new Set([
  "https://photowalashubham.shubhambankar96214.workers.dev",
  "https://photowalashubhamowner.shubhambankar96214.workers.dev",
  "https://photowalashubham.pages.dev"
]);
function corsOrigin(request, url) {
  const origin = request.headers.get("Origin");
  if (!origin) return url.origin;
  return ALLOWED_WEB_ORIGINS.has(origin) ? origin : "";
}
function addCors(headers, request, url) {
  const origin = corsOrigin(request, url);
  if (origin) headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Vary", "Origin");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "600");
  return headers;
}

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
    }
  });
}
function cacheKeyFor(origin, action) {
  return new Request(`${origin}/api/booking?action=${encodeURIComponent(action)}`, { method: "GET" });
}
async function handleBooking(request, env, ctx) {
  const url = new URL(request.url);
  const method = request.method;
  const action = url.searchParams.get("action") || "";
  const origin = corsOrigin(request, url);
  const headers = addCors(new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
    "Pragma": "no-cache",
    "X-Content-Type-Options": "nosniff"
  }), request, url);

  if (request.headers.get("Origin") && !origin) {
    return jsonResponse({ ok: false, error: "origin_not_allowed" }, 403);
  }
  if (method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (method !== "GET" && method !== "POST") {
    headers.set("Allow", "GET, POST, OPTIONS");
    return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), { status: 405, headers });
  }

  const publicRead = method === "GET" && (action === "site" || action === "reviews");
  const cache = caches.default;
  const cacheKey = publicRead ? cacheKeyFor(url.origin, action) : null;
  if (publicRead) {
    try {
      const cached = await cache.match(cacheKey);
      if (cached) {
        const hitHeaders = addCors(new Headers(cached.headers), request, url);
        hitHeaders.set("X-Photowala-Cache", "HIT");
        return new Response(cached.body, { status: cached.status, statusText: cached.statusText, headers: hitHeaders });
      }
    } catch (_) { /* Cache miss must never stop the page. */ }
  }

  const target = new URL(APPS_SCRIPT_URL);
  target.search = url.search;
  const options = { method, redirect: "follow", headers: {} };
  let postedAction = "";
  if (method === "POST") {
    options.headers["Content-Type"] = "text/plain;charset=utf-8";
    options.body = await request.text();
    try { postedAction = String(JSON.parse(options.body).action || ""); } catch (_) {}
  }

  try {
    const upstream = await fetch(target.toString(), options);
    const bodyText = await upstream.text();
    let parsed;
    try { parsed = JSON.parse(bodyText); }
    catch (_) {
      headers.set("Cache-Control", "no-store");
      return new Response(JSON.stringify({ ok: false, error: "upstream_non_json", message: "The booking service did not return JSON. Check the Apps Script Web App deployment and access setting." }), { status: upstream.ok ? 502 : upstream.status, headers });
    }

    let response;
    if (upstream.ok && publicRead && parsed && parsed.ok === true) {
      const responseHeaders = addCors(new Headers(headers), request, url);
      responseHeaders.set("Cache-Control", "public, max-age=0, s-maxage=30");
      responseHeaders.set("X-Photowala-Cache", "MISS");
      response = new Response(JSON.stringify(parsed), { status: 200, headers: responseHeaders });
      try { const write = cache.put(cacheKey, response.clone()); if (ctx && typeof ctx.waitUntil === "function") ctx.waitUntil(write); else await write; } catch (_) {}
    } else {
      const responseHeaders = addCors(new Headers(headers), request, url);
      response = new Response(JSON.stringify(parsed), { status: upstream.ok ? 200 : upstream.status, headers: responseHeaders });
    }
    if (method === "POST" && ["o_site_save", "o_site_upload"].includes(postedAction) && parsed && parsed.ok === true) {
      try { const purge = Promise.all([cache.delete(cacheKeyFor(url.origin, "site")), cache.delete(cacheKeyFor(url.origin, "reviews"))]); if (ctx && typeof ctx.waitUntil === "function") ctx.waitUntil(purge); else await purge; } catch (_) {}
    }
    return response;
  } catch (_) {
    const responseHeaders = addCors(new Headers({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }), request, url);
    return new Response(JSON.stringify({ ok: false, error: "upstream_unavailable", message: "Could not contact the booking service from Cloudflare. Check the Apps Script Web App deployment, then retry." }), { status: 502, headers: responseHeaders });
  }
}

async function handleMedia(request, id, ctx) {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405, headers: { "Allow": "GET, HEAD", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  if (!/^[A-Za-z0-9_-]{20,80}$/.test(id)) return new Response("Invalid media ID", { status: 400, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  const url = new URL(request.url), cache = caches.default;
  const cacheKey = new Request(`${url.origin}/__photowala_drive_media_cache/${id}`, { method: "GET" });
  try { const cached = await cache.match(cacheKey); if (cached) return request.method === "HEAD" ? new Response(null, { status: cached.status, headers: cached.headers }) : cached; } catch (_) {}
  try {
    const upstream = await fetch(`https://lh3.googleusercontent.com/d/${id}=w1600`, { headers: { "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" }, redirect: "follow" });
    const type = (upstream.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    if (!upstream.ok || !type.startsWith("image/")) return new Response("Image unavailable. Confirm the Drive file is shared for public viewing.", { status: upstream.status === 404 ? 404 : 502, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
    const headers = new Headers({ "Content-Type": type, "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400", "CDN-Cache-Control": "public, max-age=604800, stale-while-revalidate=86400", "X-Content-Type-Options": "nosniff", "Cross-Origin-Resource-Policy": "same-origin" });
    for (const h of ["content-length", "etag", "last-modified"]) { const v = upstream.headers.get(h); if (v) headers.set(h === "content-length" ? "Content-Length" : h === "etag" ? "ETag" : "Last-Modified", v); }
    const response = new Response(request.method === "HEAD" ? null : upstream.body, { status: 200, headers });
    if (request.method === "GET") { try { const write = cache.put(cacheKey, response.clone()); if (ctx && typeof ctx.waitUntil === "function") ctx.waitUntil(write); else await write; } catch (_) {} }
    return response;
  } catch (_) { return new Response("Media source temporarily unavailable", { status: 502, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } }); }
}
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/booking" || url.pathname === "/api/booking/") return handleBooking(request, env, ctx);
    if (url.pathname === "/api/health" || url.pathname === "/api/health/") return handleBooking(new Request(`${url.origin}/api/booking?action=version`, { headers: request.headers }), env, ctx);
    const match = url.pathname.match(/^\/media\/([^/]+)\/?$/);
    if (match) return handleMedia(request, match[1], ctx);
    if (env.SITE_MODE === "owner" && url.pathname === "/") return env.ASSETS.fetch(new Request(new URL("/owner.html", url).toString(), request));
    return env.ASSETS.fetch(request);
  }
};