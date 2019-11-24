if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
        console.log("[Vamos Crescer] active service worker found, no need to register");
    } else {
        navigator.serviceWorker
            .register("/sw.js", {
                scope: "../"
            })
            .then(function(reg) {
                console.log("[Vamos Crescer] Service worker has been registered for scope: " + reg.scope);
            });
    }
}