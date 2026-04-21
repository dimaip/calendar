import { AuthProvider as AuthProviderOriginal, AuthProviderProps, useAuth } from 'oidc-react';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorResponse, User, UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { renewOidcUser } from 'utils/renewOidcUser';

const clientId = '229793417436135450@pb';
const scope = 'offline_access openid profile email urn:zitadel:iam:org:id:229787051975770138';

const userManager = new UserManager({
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    authority: process.env.Z_URL || '',
    client_id: clientId,
    redirect_uri: process.env.PUBLIC_URL || '',
    silent_redirect_uri: process.env.PUBLIC_URL,
    post_logout_redirect_uri: process.env.PUBLIC_URL,
    response_type: 'code',
    scope,
    loadUserInfo: true,
    automaticSilentRenew: false,
    includeIdTokenInSilentRenew: true,
});

type SessionStatus = 'loading' | 'authenticated' | 'expired' | 'signedOut';

interface SessionContextValue {
    isAuthenticated: boolean;
    isLoading: boolean;
    profile: User['profile'] | null;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    status: SessionStatus;
    token: string | null;
    user: User | null;
    renew: () => Promise<User | null>;
    expire: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

const isTerminalRenewError = (error: unknown) => {
    if (error instanceof ErrorResponse) {
        return error.error === 'invalid_grant';
    }

    if (typeof error === 'object' && error !== null && 'error' in error) {
        return error.error === 'invalid_grant';
    }

    return error instanceof Error && error.message.includes('invalid_grant');
};

const buildLogoutUrl = (idToken: string | null) => {
    const authority = process.env.Z_URL;
    const postLogoutRedirectUri = process.env.PUBLIC_URL;
    if (!authority || !postLogoutRedirectUri) return null;

    const logoutUrl = new URL('/oidc/v1/end_session', authority);
    if (idToken) {
        logoutUrl.searchParams.set('id_token_hint', idToken);
    }
    logoutUrl.searchParams.set('post_logout_redirect_uri', postLogoutRedirectUri);
    return logoutUrl.toString();
};

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();
    const [reauthRequired, setReauthRequired] = useState(false);
    const currentUser = auth.userData && !auth.userData.expired ? auth.userData : null;
    const hasExpiredUser = !!auth.userData?.expired;
    const status =
        auth.isLoading && !currentUser
            ? 'loading'
            : currentUser
            ? 'authenticated'
            : hasExpiredUser || reauthRequired
            ? 'expired'
            : 'signedOut';

    const renew = useCallback(async () => {
        if (currentUser) {
            return currentUser;
        }

        try {
            const user = await renewOidcUser(auth.userManager);
            if (user && !user.expired) {
                setReauthRequired(false);
                return user;
            }
        } catch (error) {
            if (isTerminalRenewError(error)) {
                setReauthRequired(true);
                return null;
            }
        }
        return null;
    }, [auth.userManager, currentUser]);

    const expire = useCallback(async () => {
        await auth.userManager.removeUser();
        setReauthRequired(true);
    }, [auth.userManager]);

    const signIn = useCallback(async () => {
        setReauthRequired(false);
        await auth.signIn();
    }, [auth]);

    const signOut = useCallback(async () => {
        const idToken = auth.userData?.id_token ?? null;
        const logoutUrl = buildLogoutUrl(idToken);

        await auth.userManager.removeUser();
        setReauthRequired(false);

        if (logoutUrl) {
            window.location.href = logoutUrl;
        }
    }, [auth]);

    const value = useMemo<SessionContextValue>(
        () => ({
            expire,
            isAuthenticated: !!currentUser,
            isLoading: status === 'loading',
            profile: currentUser?.profile ?? null,
            renew,
            signIn,
            signOut,
            status,
            token: currentUser?.id_token ?? null,
            user: currentUser,
        }),
        [currentUser, expire, renew, signIn, signOut, status]
    );

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within AuthProvider');
    }

    return context;
};

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
        automaticSilentRenew: false,
        scope,
        userManager,
    };

    return (
        <AuthProviderOriginal {...oidcConfig}>
            <SessionProvider>{children}</SessionProvider>
        </AuthProviderOriginal>
    );
};
