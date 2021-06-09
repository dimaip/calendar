import React, { useEffect, useState, useRef } from 'react';
import { HashRouter } from 'react-router-dom';

import Routes from '../Routes';

import 'styles/reset.css';
import ZoomControl from 'components/ZoomControl/ZoomControl';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { Plugins } from '@capacitor/core';
import { RecoilRoot } from 'recoil';
import recoilPersist from 'recoil-persist';
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

    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

    const [state, send, service] = useMachine(subscription, {
        devTools: true,
        state: initialState,
        guards: {
            isAuthenticated: (c) => c.isAuthenticated,
            subscribed: (c, e) => Boolean(c.user1),
            alreadySubscribedChosen: (c, e) => c.alreadySubscribedChosen,
        },
        actions: {
            authenticateUser: (context, event) => {
                loginWithRedirect();
            },
        },
    });

    useEffect(() => {
        send('BOOT');
    }, []);
    useEffect(() => {
        if (!isLoading) {
            send('AUTH_LOADED', { isAuthenticated, user });
        }
    }, [isLoading]);

    service.onTransition((state, ...rest) => {
        const authState = state.toStrings().find((s) => s.endsWith('.authentication.authenticate'));
        console.log(state.value);
        if (authState) {
            console.log(authState);
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
