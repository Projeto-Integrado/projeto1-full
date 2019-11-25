const CACHE = "vamoscrescer-page";

const offlineFallbackPage = "ToDo-replace-this-name.html";

let cached_assets = [
    '/',
    'index.html',
    '/stylesheets/font-awesome.min.css',
    '/stylesheets/style.css',
    '/javascripts/jquery-3.3.1.slim.min.js',
    'javascripts/popper.min.js',
    'javascripts/bootstrap.min.js'
];


self.addEventListener("install", function(event) {
    console.log("[Vamos Crescer] Install Event processing");

    event.waitUntil(
        caches.open(CACHE).then(function(cache) {
            console.log("[Vamos Crescer] Cached offline page during install");

            if (offlineFallbackPage === "ToDo-replace-this-name.html") {
                return cache.add(new Response("TODO: Update the value of the offlineFallbackPage constant in the serviceworker."));
            }

            return cache.add(cached_assets);
        })
    );
});

// If any fetch fails, it will show the offline page.
self.addEventListener("fetch", function(event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fetch(event.request).catch(function(error) {
            // The following validates that the request was for a navigation to a new document
            if (
                event.request.destination !== "document" ||
                event.request.mode !== "navigate"
            ) {
                return;
            }

            console.error("[Vamos Crescer] Network request Failed. Serving offline page " + error);
            return caches.open(CACHE).then(function(cache) {
                return cache.match(offlineFallbackPage);
            });
        })
    );
});

self.addEventListener("refreshOffline", function() {
    const offlinePageRequest = new Request(offlineFallbackPage);

    return fetch(offlineFallbackPage).then(function(response) {
        return caches.open(CACHE).then(function(cache) {
            console.log("[Vamos Crescer] Offline page updated from refreshOffline event: " + response.url);
            return cache.put(offlinePageRequest, response);
        });
    });
});