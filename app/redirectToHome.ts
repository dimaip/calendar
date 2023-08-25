import throttle from 'lodash.throttle';

// Only activate for installed apps
if (window.location.search.includes('utm_source=homescreen') || window.origin?.includes?.('capacitor://')) {
    // Keep track of last accessed time
    let lastAccessed = new Date();
    const updateLastAccessed = () => {
        lastAccessed = new Date();
    };
    const updateLastAccessedThrottled = throttle(updateLastAccessed, 1000);
    window.addEventListener('touchstart', updateLastAccessedThrottled);
    window.addEventListener('click', updateLastAccessedThrottled);

    document.addEventListener('visibilitychange', function () {
        const sixHAgo = new Date();
        sixHAgo.setHours(-6);
        // If inactive for 6h and accessed from homescreen, redirect to home
        if (document.visibilityState === 'visible' && lastAccessed < sixHAgo) {
            window.location.href = window.location.search.includes('utm_source=homescreen')
                ? '/?utm_source=homescreen'
                : '/';
        }
    });
}
