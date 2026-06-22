// Service Worker for han-visuals — cache-first with network fallback
const CACHE = "han-visuals-v2";
const BASE = "/han-visuals";

const PRECACHE = [
  `${BASE}/`,
  `${BASE}/portfolio/`,
  `${BASE}/films/`,
  `${BASE}/journal/`,
  `${BASE}/about/`,
  `${BASE}/contact/`,
  `${BASE}/gear/`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only cache same-origin requests
  if (url.origin !== self.location.origin) return;

  // For navigations (HTML pages): network-first with cache fallback
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // For static assets: cache-first
  if (
    url.pathname.match(
      /\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?|mp4|webm)$/
    )
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const cloned = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, cloned));
          return response;
        });
      })
    );
  }
});
