import throttle from 'lodash.throttle';

// Only activate for installed apps
if (window.location.search.includes('utm_source=homescreen')) {
    // Keep track of last accessed time
    let lastAccessed = new Date();
    const updateLastAccessed = () => {
        lastAccessed = new Date();
    };
    const updateLastAccessedThrottled = throttle(updateLastAccessed, 1000);
    window.addEventListener('touchstart', updateLastAccessedThrottled);
    window.addEventListener('click', updateLastAccessedThrottled);

    document.addEventListener('visibilitychange', function() {
        const sixHAgo = new Date();
        sixHAgo.setHours(-6);
        // If inactive for 6h and accessed from homescreen, redirect to home
        if (
            document.visibilityState === 'visible' &&
            window.location.search.includes('from_home') &&
            lastAccessed < sixHAgo
        ) {
            window.location.href = '/?utm_source=homescreen';
        }
    });
}
