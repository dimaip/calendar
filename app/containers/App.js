import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from '../Routes';
import 'styles/reset.css';
import ZoomControl from 'components/ZoomControl/ZoomControl';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Plugins } from '@capacitor/core';
import { RecoilRoot } from 'recoil';
import recoilPersist from 'recoil-persist';

const { RecoilPersist, updateState } = recoilPersist([
    'scriptEditorIsActive',
    'iosPromptDismissed',
    'zoomControlIsShown',
    'zoomState',
    'langState',
    'themeState',
]);

const queryCache = new QueryCache({
    defaultConfig: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
});

export default () => {
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
            <ReactQueryCacheProvider queryCache={queryCache}>
                <HashRouter>
                    <Routes />
                </HashRouter>
                <ZoomControl />
            </ReactQueryCacheProvider>
        </RecoilRoot>
    );
};
