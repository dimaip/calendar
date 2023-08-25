import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Pullable from 'react-pullable';
import ScrollRestoration from 'components/ScrollRestoration/ScrollRestoration';
import 'styles/reset.css';
import ZoomControl from 'components/ZoomControl/ZoomControl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Plugins } from '@capacitor/core';
import { useSetRecoilState } from 'recoil';
import pendingUpdateState from 'state/pendingUpdateState';
import checkVersion from 'checkVersion';
import precache from 'precache';
import isDarkMode from 'utils/isDarkMode';
import { AuthProvider } from 'oidc-react';
import { WebStorageStateStore } from 'oidc-client-ts';

import Routes from '../Routes';

import { SyncWithDB } from './RecoilSync';

const oidcConfig = {
    onSignIn: () => {
        window.history.replaceState({}, document.title, window.location.pathname);
    },
    authority: process.env.Z_URL,
    clientId: '201235497572433922@пб',
    responseType: 'code',
    redirectUri: process.env.PUBLIC_URL,
    autoSignIn: false,
    automaticSilentRenew: true,
    scope: 'openid profile email urn:zitadel:iam:user:metadata urn:zitadel:iam:org:id:201235384292605954',
    userStore: new WebStorageStateStore({
        store: window.localStorage,
    }),
};

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
        Plugins.SplashScreen.hide();
    }, []);
    const dark = isDarkMode();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider {...oidcConfig}>
                <SyncWithDB>
                    <HashRouter>
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
                    </HashRouter>
                </SyncWithDB>
            </AuthProvider>
            <ZoomControl />
        </QueryClientProvider>
    );
};
