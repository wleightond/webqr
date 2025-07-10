"use strict"
self.addEventListener('install', event => {
  event.waitUntil((async () => {
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim()); // Takes control of all pages immediately
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    try {
      const newRequest = new Request(event.request, {
        referrer: (event.request.referrer?event.request.referrer:event.registration.scope)
      });
      const fetchResponse = await fetch(newRequest);
      return fetchResponse;
    } catch (e) {
      // The network failed
    }
  })());
}); 