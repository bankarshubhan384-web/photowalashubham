/* Lightweight service worker: cache only static assets; never intercept API or HTML navigation. */
const CACHE='pws-static-v11';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('pws-static-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin||u.pathname.startsWith('/api/')||u.pathname==='/media/'||r.mode==='navigate')return;if(!u.pathname.startsWith('/assets/')&&!/\.(?:png|webp|svg|ico|woff2)$/.test(u.pathname))return;e.respondWith((async()=>{const c=await caches.open(CACHE);const hit=await c.match(r);const fresh=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>hit);return hit||fresh})())});
