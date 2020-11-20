importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/detail_club.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/css/material-icons.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/sw-register.js', revision: '1' },
    { url: '/js/detail_club.js', revision: '1' },
    { url: '/icon/iconfont/MaterialIcons-Regular.eot', revision: '1' },
    { url: '/icon/iconfont/MaterialIcons-Regular.woff2', revision: '1' },
    { url: '/icon/iconfont/MaterialIcons-Regular.woff', revision: '1' },
    { url: 'icon/iconfont/MaterialIcons-Regular.ttf', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/img/poto-rizki.jpeg', revision: '1' },
    { url: '/icon-512.png', revision: '1' },
    { url: '/icon-192.png', revision: '1' },
    { url: '/custom_icon.png', revision: '1' },
], 
  { ignoreUrlParametersMatching: [/.*/]}
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/'),
  workbox.strategies.staleWhileRevalidate({
      networkTimeoutSeconds: 5,     // 5 detik
      cacheName: 'api-football'
  })
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});