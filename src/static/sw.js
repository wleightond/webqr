"use strict"
self.addEventListener('install', event => {
  event.waitUntil((async () => {
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim()); // Takes control of all pages immediately
});

self.addEventListener('fetch', event => {
  // if (event.request.url.includes('cdn-cgi/rum')) return;
  // event.respondWith((async () => {
  //   try {
  //     const fetchResponse = await fetch(event.request);
  //     return fetchResponse;
  //   } catch (e) {
  //     // The network failed
  //   }
  // })());
}); 