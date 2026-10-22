/* Photowala Shubham: update-friendly shell; do not cache booking/API or page HTML. */
self.addEventListener("install", function(event) { event.waitUntil(self.skipWaiting()); });
self.addEventListener("activate", function(event) {
  event.waitUntil((async function(){
    try {
      const keys = await caches.keys();
      await Promise.all(keys.filter(function(k){ return k.indexOf("photowala-") === 0; }).map(function(k){ return caches.delete(k); }));
    } catch (e) {}
    await self.clients.claim();
  })());
});
/* Intentionally no fetch handler: all requests use the network, avoiding stale booking pages. */
