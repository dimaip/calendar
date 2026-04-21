import { AuthProvider as AuthProviderOriginal, AuthProviderProps, useAuth } from 'oidc-react';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
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

type SessionStatus = 'loading' | 'authenticated' | 'renewing' | 'expired' | 'signedOut';

interface SessionContextValue {
    isAuthenticated: boolean;
    isLoading: boolean;
    profile: User['profile'] | null;
    reauthRequired: boolean;
    renewFailed: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    status: SessionStatus;
    token: string | null;
    user: User | null;
    userManager: UserManager;
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
    const [stableUser, setStableUser] = useState<User | null>(null);
    const [status, setStatus] = useState<SessionStatus>('loading');
    const [reauthRequired, setReauthRequired] = useState(false);
    const [renewFailed, setRenewFailed] = useState(false);
    const stableUserRef = useRef<User | null>(null);
    const reauthRequiredRef = useRef(false);
    stableUserRef.current = stableUser;
    reauthRequiredRef.current = reauthRequired;

    const currentUser = useMemo(() => {
        if (auth.userData && !auth.userData.expired) {
            return auth.userData;
        }

        if (stableUser && !stableUser.expired && status !== 'signedOut' && status !== 'expired') {
            return stableUser;
        }

        return null;
    }, [auth.userData, stableUser, status]);

    const renew = useCallback(async () => {
        const fallbackUser = stableUserRef.current && !stableUserRef.current.expired ? stableUserRef.current : null;
        if (reauthRequiredRef.current) {
            return fallbackUser;
        }

        setStatus((currentStatus) =>
            currentStatus === 'signedOut' || currentStatus === 'expired' ? currentStatus : 'renewing'
        );

        try {
            const user = await renewOidcUser(auth.userManager);
            if (user && !user.expired) {
                setStableUser(user);
                setReauthRequired(false);
                setRenewFailed(false);
                setStatus('authenticated');
                return user;
            }
        } catch (error) {
            if (isTerminalRenewError(error)) {
                if (fallbackUser) {
                    setReauthRequired(true);
                    setRenewFailed(true);
                    setStatus('authenticated');
                    return fallbackUser;
                }

                setStableUser(null);
                setReauthRequired(true);
                setRenewFailed(true);
                setStatus('expired');
                return null;
            }
        }

        if (fallbackUser) {
            setRenewFailed(true);
            setStatus('authenticated');
            return fallbackUser;
        }

        setStableUser(null);
        setRenewFailed(true);
        setStatus('expired');
        return null;
    }, [auth.userManager]);

    const expire = useCallback(async () => {
        await auth.userManager.removeUser();
        setStableUser(null);
        setReauthRequired(true);
        setRenewFailed(true);
        setStatus('expired');
    }, [auth.userManager]);

    const signIn = useCallback(async () => {
        setReauthRequired(false);
        setRenewFailed(false);
        await auth.signIn();
    }, [auth]);

    const signOut = useCallback(async () => {
        const idToken = (auth.userData ?? stableUserRef.current)?.id_token ?? null;
        const logoutUrl = buildLogoutUrl(idToken);

        await auth.userManager.removeUser();
        setStableUser(null);
        setReauthRequired(false);
        setRenewFailed(false);
        setStatus('signedOut');

        if (logoutUrl) {
            window.location.href = logoutUrl;
        }
    }, [auth]);

    useEffect(() => {
        if (auth.isLoading) {
            if (!stableUserRef.current) {
                setStatus('loading');
            }
            return;
        }

        if (auth.userData && !auth.userData.expired) {
            setStableUser(auth.userData);
            setReauthRequired(false);
            setRenewFailed(false);
            setStatus('authenticated');
            return;
        }

        if (!stableUserRef.current) {
            setStatus((currentStatus) => (currentStatus === 'expired' ? 'expired' : 'signedOut'));
            return;
        }

        if (stableUserRef.current.expired) {
            setStableUser(null);
            setReauthRequired(true);
            setRenewFailed(true);
            setStatus('expired');
        }
    }, [auth.isLoading, auth.userData]);

    useEffect(() => {
        const removeUserLoaded = auth.userManager.events.addUserLoaded((user) => {
            setStableUser(user);
            setReauthRequired(false);
            setRenewFailed(false);
            setStatus('authenticated');
        });

        const removeAccessTokenExpiring = auth.userManager.events.addAccessTokenExpiring(() => {
            if (reauthRequiredRef.current) {
                return;
            }
            void renew();
        });

        const removeAccessTokenExpired = auth.userManager.events.addAccessTokenExpired(() => {
            setStableUser(null);
            setReauthRequired(true);
            setRenewFailed(true);
            setStatus('expired');
        });

        const removeSilentRenewError = auth.userManager.events.addSilentRenewError((error) => {
            const fallbackUser = stableUserRef.current;
            const terminal = isTerminalRenewError(error);
            if (fallbackUser && !fallbackUser.expired) {
                setReauthRequired(terminal);
                setRenewFailed(true);
                setStatus('authenticated');
                return;
            }

            setStableUser(null);
            setReauthRequired(true);
            setRenewFailed(true);
            setStatus('expired');
        });

        const removeUserUnloaded = auth.userManager.events.addUserUnloaded(() => {
            setStableUser(null);
            setReauthRequired(false);
            setRenewFailed(false);
            setStatus('signedOut');
        });

        const removeUserSignedOut = auth.userManager.events.addUserSignedOut(() => {
            setStableUser(null);
            setReauthRequired(false);
            setRenewFailed(false);
            setStatus('signedOut');
        });

        return () => {
            removeUserLoaded();
            removeAccessTokenExpiring();
            removeAccessTokenExpired();
            removeSilentRenewError();
            removeUserUnloaded();
            removeUserSignedOut();
        };
    }, [auth.userManager, renew]);

    const value = useMemo<SessionContextValue>(
        () => ({
            expire,
            isAuthenticated: !!currentUser,
            isLoading: status === 'loading',
            profile: currentUser?.profile ?? null,
            reauthRequired,
            renew,
            renewFailed,
            signIn,
            signOut,
            status,
            token: currentUser?.id_token ?? null,
            user: currentUser,
            userManager: auth.userManager,
        }),
        [auth.userManager, currentUser, expire, reauthRequired, renew, renewFailed, signIn, signOut, status]
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
