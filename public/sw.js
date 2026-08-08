// High-Performance Orbit Electronics Browser Cache Service Worker
const CACHE_NAME = 'orbit-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/img/Orbi logo.svg',
  '/img/bestsellers_banner.png',
  '/img/hero3.webp',
  '/img/catagories4.webp',
  '/img/smart204320hd.webp',
  '/img/550a_compressed.webp',
  '/img/stoves50X50.jpeg',
  '/img/product-washing1.jpeg',
  '/img/water1_compressed.webp',
];

// Install Event: Pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) return caches.delete(key);
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-while-revalidate for images & static assets
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Intercept images, CSS, JS chunks, and web fonts
  if (
    url.pathname.startsWith('/img/') ||
    url.pathname.startsWith('/_next/static/') ||
    event.request.destination === 'image' ||
    event.request.destination === 'style' ||
    event.request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
