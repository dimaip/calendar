import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Pullable from 'react-pullable';
import 'styles/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Plugins } from '@capacitor/core';
import { useSetRecoilState } from 'recoil';

import Routes from '../Routes';

import { SyncWithDB } from './RecoilSync';
import { AuthProvider } from './AuthProvider';
import { ConvexClientProvider } from './HabitTracker/ConvexClientProvider';

import pendingUpdateState from 'state/pendingUpdateState';
import checkVersion from 'checkVersion';
import precache from 'precache';
import isDarkMode from 'utils/isDarkMode';
import RouteErrorBoundary from 'components/RouteErrorBoundary/RouteErrorBoundary';
import ScrollRestoration from 'components/ScrollRestoration/ScrollRestoration';
import { markNavigationIntent, markPerformance } from 'utils/performanceMarks';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});

const App = () => {
    const setPendingUpdate = useSetRecoilState(pendingUpdateState);
    useEffect(() => {
        const loader = document.getElementById('loader');
        const reactRoot = document.getElementById('react-root');
        if (loader && reactRoot) {
            loader.style.display = 'none';
            reactRoot.style.display = 'block';
            markPerformance('inline_loader_hidden');
        }
        void Plugins.SplashScreen.hide();
    }, []);
    useEffect(() => {
        const markLinkNavigationIntent = (event: MouseEvent) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            const eventTarget = event.target;
            if (!(eventTarget instanceof Element)) {
                return;
            }

            const link = eventTarget.closest('a[href]');
            if (!link || link.hasAttribute('download') || link.getAttribute('target') === '_blank') {
                return;
            }

            const destination = new URL((link as HTMLAnchorElement).href, window.location.href);
            if (destination.origin !== window.location.origin) {
                return;
            }

            markNavigationIntent({ initiator: 'link-click', target: `${destination.pathname}${destination.hash}` });
        };
        const markHistoryNavigationIntent = () => {
            markNavigationIntent({
                initiator: 'browser-history',
                target: `${window.location.pathname}${window.location.hash}`,
            });
        };

        document.addEventListener('click', markLinkNavigationIntent, { capture: true, passive: true });
        window.addEventListener('popstate', markHistoryNavigationIntent);
        return () => {
            document.removeEventListener('click', markLinkNavigationIntent, { capture: true });
            window.removeEventListener('popstate', markHistoryNavigationIntent);
        };
    }, []);
    const dark = isDarkMode();
    return (
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <RouteErrorBoundary>
                    <AuthProvider>
                        <ConvexClientProvider>
                            <SyncWithDB>
                                <ScrollRestoration />
                                <Pullable
                                    spinnerColor={dark ? '#fff' : '#000'}
                                    onRefresh={async () => {
                                        const newVersion = await checkVersion();
                                        if (newVersion) {
                                            setPendingUpdate(newVersion);
                                        }
                                        await precache(true);
                                        await queryClient.refetchQueries();
                                    }}
                                    shouldPullToRefresh={() => window.scrollY <= 0 && !window.pullDownDisabled}
                                >
                                    <Routes />
                                </Pullable>
                            </SyncWithDB>
                        </ConvexClientProvider>
                    </AuthProvider>
                </RouteErrorBoundary>
            </HashRouter>
        </QueryClientProvider>
    );
};

export default App;
