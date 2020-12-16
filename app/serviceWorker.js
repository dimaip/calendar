export function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            navigator.serviceWorker
                .register(swUrl)
                .then(registration => {
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        if (installingWorker == null) {
                            return;
                        }
                        // Prevents Chrome's "Update on reload" from going into infinite loop
                        let lockRefresh = false;
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state == 'activated') {
                                if (lockRefresh) {
                                    return;
                                }
                                lockRefresh = true;
                                // serviceWorker.controller points to the current SW. If it exists, it means it's an update.
                                if (navigator.serviceWorker.controller) {
                                    console.log('SW update activated', VERSION);
                                    window.location.reload();
                                } else {
                                    // @TODO: display a "Content is cached for offline use." message.
                                    console.log('Fresh SW activated.', VERSION);
                                }
                            }
                        };
                    };
                })
                .catch(error => {
                    console.error('Error during service worker registration:', error);
                });
        });
    }
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(registration => {
                registration.unregister();
            })
            .catch(error => {
                console.error(error.message);
            });
    }
}
