const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyRVsEC8gBr2D3bb1H3A97jyJWwLPWk_xsBV-iLHtynErfNGRF_bYfTnYUYjLUpTxvz8g/exec";

function cacheKeyFor(origin, action) {
  return new Request(`${origin}/api/booking?action=${encodeURIComponent(action)}`, { method: "GET" });
}

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const method = request.method;
  const action = url.searchParams.get("action") || "";
  const publicRead = method === "GET" && (action === "site" || action === "reviews");
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
    "Pragma": "no-cache",
    "X-Content-Type-Options": "nosniff"
  };

  if (method === "OPTIONS") {
    headers["Access-Control-Allow-Origin"] = url.origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "600";
    return new Response(null, { status: 204, headers });
  }
  if (method !== "GET" && method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
      status: 405, headers: { ...headers, "Allow": "GET, POST, OPTIONS" }
    });
  }

  const cache = caches.default;
  const cacheKey = publicRead ? cacheKeyFor(url.origin, action) : null;
  if (publicRead) {
    try {
      const cached = await cache.match(cacheKey);
      if (cached) {
        const hitHeaders = new Headers(cached.headers);
        hitHeaders.set("X-Photowala-Cache", "HIT");
        return new Response(cached.body, { status: cached.status, statusText: cached.statusText, headers: hitHeaders });
      }
    } catch (_) { /* A cache miss must not stop the public page from loading. */ }
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
    const text = await upstream.text();
    let parsed;
    try { parsed = JSON.parse(text); }
    catch (_) {
      return new Response(JSON.stringify({ ok: false, error: "upstream_non_json", message: "The booking service did not return JSON. Check the Apps Script deployment." }), {
        status: upstream.ok ? 502 : upstream.status, headers
      });
    }

    const responseHeaders = new Headers(headers);
    let response;
    if (upstream.ok && publicRead && parsed && parsed.ok === true) {
      // Public site settings and approved reviews can be cached briefly at the edge.
      // Browser max-age stays zero; only Cloudflare edge requests reuse this response.
      responseHeaders.set("Cache-Control", "public, max-age=0, s-maxage=30");
      responseHeaders.set("X-Photowala-Cache", "MISS");
      response = new Response(JSON.stringify(parsed), { status: 200, headers: responseHeaders });
      try {
        const write = cache.put(cacheKey, response.clone());
        if (typeof context.waitUntil === "function") context.waitUntil(write);
        else await write;
      } catch (_) { /* Return the upstream response even if caching is unavailable. */ }
    } else {
      response = new Response(JSON.stringify(parsed), { status: upstream.ok ? 200 : upstream.status, headers: responseHeaders });
    }

    // Invalidate public site data after a successful owner save/upload in this edge location.
    // Other edge locations still have only a 30-second TTL, so edits propagate quickly.
    if (method === "POST" && ["o_site_save", "o_site_upload"].includes(postedAction) && parsed && parsed.ok === true) {
      try {
        const purge = Promise.all([
          cache.delete(cacheKeyFor(url.origin, "site")),
          cache.delete(cacheKeyFor(url.origin, "reviews"))
        ]);
        if (typeof context.waitUntil === "function") context.waitUntil(purge);
        else await purge;
      } catch (_) { /* Short TTL remains the fallback. */ }
    }
    return response;
  } catch (_) {
    return new Response(JSON.stringify({ ok: false, error: "upstream_unavailable", message: "Could not contact the booking service. Please try again or contact Shubham." }), {
      status: 502, headers
    });
  }
}
