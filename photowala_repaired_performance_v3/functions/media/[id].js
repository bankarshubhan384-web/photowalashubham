/**
 * Cacheable public-photo proxy for Google Drive.
 *
 * Only accepts a Drive file ID and only returns image/* content. Private records,
 * customer PDFs, bookings, and videos are intentionally not exposed by this route.
 * Public source files must be shared as "Anyone with the link can view".
 */
export async function onRequest(context) {
  const request = context.request;
  const id = String(context.params?.id || "");

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { "Allow": "GET, HEAD", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }
    });
  }

  if (!/^[A-Za-z0-9_-]{20,80}$/.test(id)) {
    return new Response("Invalid media ID", {
      status: 400,
      headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }
    });
  }

  const requestUrl = new URL(request.url);
  const cache = caches.default;
  const cacheKey = new Request(`${requestUrl.origin}/__photowala_drive_media_cache/${id}`, { method: "GET" });

  try {
    const cached = await cache.match(cacheKey);
    if (cached) {
      return request.method === "HEAD"
        ? new Response(null, { status: cached.status, headers: cached.headers })
        : cached;
    }
  } catch (_) {
    // Cache failures should not prevent the image from loading.
  }

  try {
    const upstream = await fetch(`https://lh3.googleusercontent.com/d/${id}=w1600`, {
      headers: { "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" },
      redirect: "follow"
    });
    const type = (upstream.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();

    if (!upstream.ok || !type.startsWith("image/")) {
      return new Response("Image unavailable. Confirm the Drive file is shared for public viewing.", {
        status: upstream.status === 404 ? 404 : 502,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }
      });
    }

    const headers = new Headers();
    headers.set("Content-Type", type);
    headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=86400");
    headers.set("CDN-Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Cross-Origin-Resource-Policy", "same-origin");
    const length = upstream.headers.get("content-length");
    if (length) headers.set("Content-Length", length);
    const etag = upstream.headers.get("etag");
    if (etag) headers.set("ETag", etag);
    const lastModified = upstream.headers.get("last-modified");
    if (lastModified) headers.set("Last-Modified", lastModified);

    const response = new Response(request.method === "HEAD" ? null : upstream.body, { status: 200, headers });
    if (request.method === "GET") {
      try {
        const write = cache.put(cacheKey, response.clone());
        if (typeof context.waitUntil === "function") context.waitUntil(write);
        else await write;
      } catch (_) {
        // Serving the image is more important than cache population.
      }
    }
    return response;
  } catch (_) {
    return new Response("Media source temporarily unavailable", {
      status: 502,
      headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }
    });
  }
}
