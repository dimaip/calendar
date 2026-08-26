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
        }
        void Plugins.SplashScreen.hide();
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
