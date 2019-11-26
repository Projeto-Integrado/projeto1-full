var urlsToCache_ = [
    '/#/',
    'index.html',
    'sobre.html',
    'calculadora.html',
    'login.html',
    '/stylesheets/font-awesome.min.css',
    '/stylesheets/style.css',
    '/javascripts/jquery-3.3.1.slim.min.js',
    'javascripts/popper.min.js',
    'javascripts/bootstrap.min.js'
];

var version = 'v16';

self.addEventListener('install', function(event) {
    console.log('[Vamos Crescer] - [ServiceWorker] Installed version', version);
    event.waitUntil(
        caches.open(version)
        .then(function(cache) {
            console.log("[Vamos Crescer] opened cache");
            return cache.addAll(urlsToCache_);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});


self.addEventListener('activate', function(event) {

    var cacheWhitelist = [version];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (version && cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[Vamos Crescer] Deleted old cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});