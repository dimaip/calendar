import React, { useEffect, useState, useRef } from 'react';
import { HashRouter } from 'react-router-dom';

import Routes from '../Routes';

import 'styles/reset.css';
import ZoomControl from 'components/ZoomControl/ZoomControl';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Plugins } from '@capacitor/core';
import { RecoilRoot } from 'recoil';
import recoilPersist from 'recoil-persist';
import { useApi } from 'hooks/useApi';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useMachine } from '@xstate/react';
import subscription, { SubscriptionMachineContext } from 'stateMachines/subscription';
import { State } from 'xstate';

const { RecoilPersist, updateState } = recoilPersist([
    'scriptEditorIsActive',
    'iosPromptDismissed',
    'zoomControlIsShown',
    'zoomState',
    'langState',
]);

const queryCache = new QueryCache({
    defaultConfig: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
});

const Inner = (): JSX.Element => {
    useEffect(() => {
        const loader = document.getElementById('loader');
        const reactRoot = document.getElementById('react-root');
        if (loader && reactRoot) {
            loader.style.display = 'none';
            reactRoot.style.display = 'block';
        }
        Plugins.SplashScreen.hide();
    }, []);

    const storedContext = localStorage.getItem('xStateAuthContext');
    let initialState;
    if (storedContext) {
        const { state, context } = JSON.parse(storedContext);
        initialState = State.from(state, context);
        localStorage.removeItem('xStateAuthContext');
    }

    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();

    const { data: subscriptionInfo, loading: subscriptionLoading, error: apiError } = useApi(
        'http://localhost:3001/profile/subscriptionInfo'
    );

    const [state, send, service] = useMachine(subscription, {
        devTools: true,
        state: initialState,
        guards: {
            isAuthenticated: (c) => c.isAuthenticated,
            subscribed: (c, e) => c.subscriptionInfo?.active,
            alreadySubscribedChosen: (c, e) => c.alreadySubscribedChosen,
        },
        actions: {
            authenticateUser: (context, event) => {
                void loginWithRedirect();
            },
        },
    });

    const authLoading = subscriptionLoading || isLoading;

    useEffect(() => {
        send('BOOT');
    }, []);
    useEffect(() => {
        if (!authLoading) {
            setTimeout(() => {
                send('AUTH_LOADED_DATA', { isAuthenticated, user, subscriptionInfo });
                send('AUTH_LOADED');
            }, 5000);
        }
    }, [authLoading, subscriptionInfo, user]);

    service.onTransition((state, ...rest) => {
        const authState = state.toStrings().find((s) => s.endsWith('.authentication.authenticate'));
        if (authState) {
            localStorage.setItem('xStateAuthContext', JSON.stringify({ state: state.value, context: state.context }));
        }
    });

    return (
        <SubscriptionMachineContext.Provider value={service}>
            {/* <h1>{JSON.stringify(state.value)}</h1> */}
            <RecoilRoot initializeState={updateState}>
                <RecoilPersist />
                <ReactQueryCacheProvider queryCache={queryCache}>
                    <HashRouter>
                        <Routes />
                    </HashRouter>
                    <ZoomControl />
                </ReactQueryCacheProvider>
            </RecoilRoot>
        </SubscriptionMachineContext.Provider>
    );
};

export default () => {
    return (
        <Auth0Provider
            domain="psmb.eu.auth0.com"
            clientId="Tngl838DN9MUXXBjvVuB1CQPKYhUbuNL"
            redirectUri={window.location.origin}
            audience="https://payments.molitva.app"
            scope="read:profile"
        >
            <Inner />
        </Auth0Provider>
    );
};
