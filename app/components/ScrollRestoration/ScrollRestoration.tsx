import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const scrollTo = (scrollnumber = 0): number =>
    window.requestAnimationFrame(() => {
        window.scrollTo(0, scrollnumber);
    });

export const getScrollPage = (): number => {
    let docScrollTop = 0;
    if (document.documentElement && document.documentElement !== null) {
        docScrollTop = document.documentElement.scrollTop;
    }
    return window.pageYOffset || docScrollTop;
};

export default function ScrollRestoration(): null {
    const location = useLocation();
    const locationRef = useRef(location);
    const previousLocationRef = useRef(location);
    const visitedUrlRef = useRef(new Map<string, number>());

    useLayoutEffect(() => {
        const previousLocation = previousLocationRef.current;
        const locationChanged =
            (location.pathname !== previousLocation.pathname || location.search !== previousLocation.search) &&
            location.hash === '';

        if (locationChanged) {
            visitedUrlRef.current.set(previousLocation.pathname, getScrollPage());
        }

        locationRef.current = location;
        previousLocationRef.current = location;
    }, [location]);

    useEffect(() => {
        const pendingTimeouts = new Set<number>();
        const handlePopStateChange = (): void => {
            const timeoutId = window.setTimeout(() => {
                pendingTimeouts.delete(timeoutId);
                const existingRecord = visitedUrlRef.current.get(locationRef.current.pathname);
                scrollTo(existingRecord || 0);
            }, 100);
            pendingTimeouts.add(timeoutId);
        };

        window.addEventListener('popstate', handlePopStateChange);
        window.addEventListener('pushstate', handlePopStateChange);
        window.addEventListener('replacestate', handlePopStateChange);

        return () => {
            window.removeEventListener('popstate', handlePopStateChange);
            window.removeEventListener('pushstate', handlePopStateChange);
            window.removeEventListener('replacestate', handlePopStateChange);
            pendingTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
            pendingTimeouts.clear();
        };
    }, []);

    return null;
}
