import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

const isProd = process.env.NODE_ENV === 'production';

let Tracker = null;

if (isProd) {
    ReactGA.initialize('G-P4KC3YS7WG');

    Tracker = ({ children, options }) => {
        const trackPage = page => {
            ReactGA.set({
                page,
                ...options,
            });
            ReactGA.pageview(page);
        };
        const location = useLocation();
        useEffect(() => trackPage(location.pathname), [location.pathname]);
        return children;
    };
} else {
    Tracker = ({ children }) => {
        return children;
    };
}
export default Tracker;
