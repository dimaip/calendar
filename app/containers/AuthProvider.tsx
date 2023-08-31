import { AuthProvider as AuthProviderOriginal, AuthProviderProps } from 'oidc-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { WebStorageStateStore } from 'oidc-client-ts';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const history = useHistory();
    const oidcConfig: AuthProviderProps = {
        onSignIn: () => {
            window.history.replaceState({}, document.title, window.location.pathname);
            history.replace('/profile');
        },
        authority: process.env.Z_URL,
        clientId: '229787870401921050@PB',
        responseType: 'code',
        redirectUri: process.env.PUBLIC_URL,
        autoSignIn: false,
        automaticSilentRenew: true,
        scope: 'openid profile email urn:zitadel:iam:user:metadata urn:zitadel:iam:org:id:201235384292605954',
        userStore: new WebStorageStateStore({
            store: window.localStorage,
        }),
    };
    return <AuthProviderOriginal {...oidcConfig}>{children}</AuthProviderOriginal>;
};
