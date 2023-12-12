import { AuthProvider as AuthProviderOriginal, AuthProviderProps, UserManager } from 'oidc-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { WebStorageStateStore } from 'oidc-client-ts';

const clientId = '229793417436135450@pb';
const scope = 'openid profile email urn:zitadel:iam:user:metadata urn:zitadel:iam:org:id:229787051975770138';

const userManager = new UserManager({
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    authority: process.env.Z_URL || '',
    client_id: clientId,
    redirect_uri: process.env.PUBLIC_URL || '',
    silent_redirect_uri: process.env.PUBLIC_URL,
    post_logout_redirect_uri: process.env.PUBLIC_URL,
    response_type: 'code',
    scope,
    loadUserInfo: false,
    automaticSilentRenew: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const history = useHistory();
    const oidcConfig: AuthProviderProps = {
        onSignIn: () => {
            window.history.replaceState({}, document.title, window.location.pathname);
            history.replace('/profile');
        },
        authority: process.env.Z_URL,
        clientId: clientId,
        responseType: 'code',
        redirectUri: process.env.PUBLIC_URL,
        autoSignIn: false,
        automaticSilentRenew: true,
        scope,
        userManager,
    };
    return <AuthProviderOriginal {...oidcConfig}>{children}</AuthProviderOriginal>;
};
