import React, { useEffect, memo, useRef } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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

interface Props {
    visitedUrl: Map<string, number>;
}

function ScrollRestoration({ history, visitedUrl }: RouteComponentProps & Props): null {
    const handlePopStateChange = (): void => {
        setTimeout(() => {
            const { location } = history;
            const { pathname } = location;
            const existingRecord = visitedUrl.get(pathname);
            scrollTo(existingRecord || 0);
        }, 10);
    };

    useEffect(() => {
        window.addEventListener('popstate', handlePopStateChange);
        window.addEventListener('pushstate', handlePopStateChange);
        window.addEventListener('replacestate', handlePopStateChange);
        return () => {
            window.removeEventListener('popstate', handlePopStateChange);
            window.removeEventListener('pushstate', handlePopStateChange);
            window.removeEventListener('replacestate', handlePopStateChange);
        };
    }, []);

    return null;
}

const ScrollRestorationWithRouter = withRouter(
    memo(ScrollRestoration, (prevProps, nextProps) => {
        const { location: prevLoaction, visitedUrl } = prevProps;
        const { location: nextLoaction } = nextProps;

        const key = prevLoaction.pathname;

        const locationChanged =
            (nextLoaction.pathname !== prevLoaction.pathname || nextLoaction.search !== prevLoaction.search) &&
            nextLoaction.hash === '';

        const scroll = getScrollPage();

        if (locationChanged) {
            visitedUrl.set(key, scroll);
        }

        return false;
    })
);

export default function Wrapper(): JSX.Element {
    const visitedUrl = useRef(new Map());

    return <ScrollRestorationWithRouter visitedUrl={visitedUrl.current} />;
}
