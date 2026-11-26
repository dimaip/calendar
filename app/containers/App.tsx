import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Pullable from 'react-pullable';

import 'styles/reset.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import { captureException } from '@sentry/react';
import { useSetRecoilState } from 'recoil';

import { startIosLiveUpdates } from '../iosLiveUpdates';
import Routes from '../Routes';

import { SyncWithDB } from './RecoilSync';
import { AuthProvider } from './AuthProvider';
import { ConvexClientProvider } from './HabitTracker/ConvexClientProvider';

import pendingUpdateState from 'state/pendingUpdateState';
import checkVersion from 'checkVersion';
import precache from 'precache';
import isDarkMode from 'utils/isDarkMode';
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

export default () => {
    const setPendingUpdate = useSetRecoilState(pendingUpdateState);
    useEffect(() => {
        const loader = document.getElementById('loader');
        const reactRoot = document.getElementById('react-root');
        if (loader && reactRoot) {
            loader.style.display = 'none';
            reactRoot.style.display = 'block';
        }
        if (Capacitor.getPlatform() === 'ios') {
            void SplashScreen.hide().catch(captureException);
            void startIosLiveUpdates();
        }
    }, []);
    const dark = isDarkMode();
    return (
        <QueryClientProvider client={queryClient}>
            <HashRouter>
                <AuthProvider>
                    <ConvexClientProvider>
                        <SyncWithDB>
                            <ScrollRestoration />
                            <Pullable
                                spinnerColor={dark ? '#fff' : '#000'}
                                onRefresh={async () => {
                                    const newVersion = await checkVersion(true);
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
            </HashRouter>
        </QueryClientProvider>
    );
};
