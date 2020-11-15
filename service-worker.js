const CACHE_NAME = "firstpwa-10";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/wisata.html",
  "/pages/kuliner.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/icon.png",
  "/ic.png",
  "/img/sarangan.jpg",
  "/img/mojosemi.jpg",
  "/img/air-terjun.jpg",
  "/img/poto-rizki.jpeg",
  "/img/sate.jpg",
  "/img/panggang.jpg",
  "/img/pecel.jpg",
  "/img/tepo.jpg",
  "/css/material-icons.css",
  "/icon/iconfont/MaterialIcons-Regular.eot",
  "/icon/iconfont/MaterialIcons-Regular.woff2",
  "/icon/iconfont/MaterialIcons-Regular.woff",
  "/icon/iconfont/MaterialIcons-Regular.ttf",
  "/manifest.json",
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });