import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';

import Routes from '../Routes';

import 'styles/reset.css';
import ZoomControl from 'components/ZoomControl/ZoomControl';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Plugins } from '@capacitor/core';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import recoilPersist from 'recoil-persist';
import pendingUpdateState from 'state/pendingUpdateState';
import checkVersion from 'checkVersion';

const { RecoilPersist, updateState } = recoilPersist([
    'scriptEditorIsActive',
    'iosPromptDismissed',
    'zoomControlIsShown',
    'zoomState',
    'langState',
]);

const queryClient = new QueryClient({
    defaultConfig: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
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
    return (
        <RecoilRoot initializeState={updateState}>
            <RecoilPersist />
            <QueryClientProvider client={queryClient}>
                <HashRouter>
                    <PullToRefresh
                        onRefresh={async () => {
                            const newVersion = await checkVersion();
                            if (newVersion) {
                                setPendingUpdate(newVersion);
                            }
                        }}
                    >
                        <Routes />
                    </PullToRefresh>
                </HashRouter>
                <ZoomControl />
            </QueryClientProvider>
        </RecoilRoot>
    );
};
