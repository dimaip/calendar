import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { INavigator, IWindow, User, UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

import { iosAuthState, parseIosAuthCallback } from './auth/iosAuthCallback';

import {
    buildLogoutUrl,
    getUserToken,
    hasCodeInUrl,
    isTerminalRenewError,
    resolveSessionToken,
    SessionStatus,
} from 'containers/auth/sessionHelpers';
import { renewOidcUser } from 'utils/renewOidcUser';

const useIosAuthCallback = Capacitor.getPlatform() === 'ios' && Capacitor.isPluginAvailable('App');
const iosRedirectNavigator: INavigator = {
    async prepare() {
        return Promise.resolve<IWindow>({
            async navigate({ url }) {
                // Capacitor sends this external URL to the system browser. The WebView stays alive.
                window.location.assign(url);
                return Promise.resolve({ url });
            },
            close() {
                // Safari is owned by the system and closes independently of this navigator.
            },
        });
    },
    async callback() {
        return Promise.resolve();
    },
};
const clientId = '229793417436135450@pb';
const scope = 'offline_access openid profile email urn:zitadel:iam:org:id:229787051975770138';

const userManager = new UserManager(
    {
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
    },
    useIosAuthCallback ? iosRedirectNavigator : undefined
);

interface SessionContextValue {
    isAuthenticated: boolean;
    isLoading: boolean;
    profile: User['profile'] | null;
    signIn: () => Promise<void>;
    signInFailed: boolean;
    signOut: () => Promise<void>;
    token: string | null;
    user: User | null;
    getToken: () => Promise<string | null>;
    renewToken: () => Promise<string | null>;
    expire: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    // The app talks to OIDC through one place:
    // - keep the current browser session in sync with oidc-client-ts
    // - expose a cheap "current token" path for normal callers
    // - expose an explicit "renew token" path for callers recovering from auth failure
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [signInFailed, setSignInFailed] = useState(false);
    const signInPending = useRef(false);
    const [status, setStatus] = useState<SessionStatus>('loading');
    const [reauthRequired, setReauthRequired] = useState(false);
    const currentUserRef = useRef<User | null>(null);
    const statusRef = useRef<SessionStatus>('loading');
    const reauthRequiredRef = useRef(false);
    const renewTokenRef = useRef<() => Promise<string | null>>(async () => null);

    const transitionToAuthenticated = useCallback((user: User) => {
        currentUserRef.current = user;
        statusRef.current = 'authenticated';
        reauthRequiredRef.current = false;
        setCurrentUser(user);
        setStatus('authenticated');
        setSignInFailed(false);
        setReauthRequired(false);
    }, []);

    const transitionToExpired = useCallback((options: { requiresReauth?: boolean } = {}) => {
        const { requiresReauth = true } = options;
        currentUserRef.current = null;
        statusRef.current = 'expired';
        reauthRequiredRef.current = requiresReauth;
        setCurrentUser(null);
        setStatus('expired');
        setReauthRequired(requiresReauth);
    }, []);

    const transitionToSignedOut = useCallback(() => {
        currentUserRef.current = null;
        statusRef.current = 'signedOut';
        reauthRequiredRef.current = false;
        setCurrentUser(null);
        setStatus('signedOut');
        setReauthRequired(false);
    }, []);

    const renewUser = useCallback(async () => {
        const user = await renewOidcUser(userManager);
        if (user && !user.expired) {
            transitionToAuthenticated(user);
            return user;
        }
        return null;
    }, [transitionToAuthenticated]);

    // `getToken` is the conservative path: return the current valid JWT when we
    // already have one, and only touch the IdP when the local session can no
    // longer supply a usable token.
    const getToken = useCallback(async () => {
        if (statusRef.current === 'loading' || statusRef.current === 'signedOut') {
            return null;
        }

        return resolveSessionToken({
            currentUser: currentUserRef.current,
            mode: 'current',
            reauthRequired: reauthRequiredRef.current,
            onTerminalFailure: () => {
                reauthRequiredRef.current = true;
                setReauthRequired(true);
            },
            renewUser,
        });
    }, [renewUser]);

    // `renewToken` is the recovery path for consumers that have already seen an
    // auth failure and want one explicit silent-renew attempt before expiring the
    // local session.
    const renewToken = useCallback(async () => {
        if (statusRef.current === 'signedOut') {
            return null;
        }

        return resolveSessionToken({
            currentUser: currentUserRef.current,
            mode: 'renew',
            reauthRequired: reauthRequiredRef.current,
            onTerminalFailure: () => {
                reauthRequiredRef.current = true;
                setReauthRequired(true);
            },
            renewUser,
        });
    }, [renewUser]);

    renewTokenRef.current = renewToken;

    const expire = useCallback(async () => {
        await userManager.removeUser();
        transitionToExpired();
    }, [transitionToExpired]);

    const signIn = useCallback(async () => {
        if (signInPending.current) return;
        signInPending.current = true;
        reauthRequiredRef.current = false;
        setReauthRequired(false);
        setSignInFailed(false);
        try {
            await userManager.signinRedirect(useIosAuthCallback ? { url_state: iosAuthState } : undefined);
        } catch {
            setSignInFailed(true);
        } finally {
            signInPending.current = false;
        }
    }, []);

    const signOut = useCallback(async () => {
        const logoutUrl = buildLogoutUrl({
            authority: process.env.Z_URL,
            idToken: getUserToken(currentUserRef.current),
            postLogoutRedirectUri: process.env.PUBLIC_URL,
        });

        await userManager.removeUser();
        transitionToSignedOut();

        if (logoutUrl) {
            window.location.href = logoutUrl;
        }
    }, [transitionToSignedOut]);

    useEffect(() => {
        let active = true;

        const bootstrap = async () => {
            const isCallback = hasCodeInUrl(window.location);
            try {
                const user = isCallback ? await userManager.signinCallback() : await userManager.getUser();

                if (!active) {
                    return;
                }

                if (isCallback) {
                    window.history.replaceState({}, document.title, window.location.pathname);
                    history.replace('/profile');
                }

                if (user && !user.expired) {
                    transitionToAuthenticated(user);
                    return;
                }

                if (user?.expired) {
                    try {
                        const renewedUser = await renewUser();
                        if (active && renewedUser) {
                            transitionToAuthenticated(renewedUser);
                            return;
                        }
                    } catch (error) {
                        if (active) {
                            transitionToExpired({ requiresReauth: isTerminalRenewError(error) });
                            return;
                        }
                    }

                    if (active) {
                        transitionToExpired({ requiresReauth: false });
                    }
                    return;
                }

                transitionToSignedOut();
            } catch (error) {
                if (!active) {
                    return;
                }

                if (isCallback) {
                    window.history.replaceState({}, document.title, window.location.pathname);
                    setSignInFailed(true);
                    history.replace('/profile');
                }
                transitionToExpired({ requiresReauth: isTerminalRenewError(error) });
            }
        };

        const removeUserLoaded = userManager.events.addUserLoaded((user) => {
            if (!active) {
                return;
            }

            if (user && !user.expired) {
                transitionToAuthenticated(user);
            } else {
                transitionToExpired({ requiresReauth: false });
            }
        });

        const removeUserUnloaded = userManager.events.addUserUnloaded(() => {
            if (active) {
                transitionToSignedOut();
            }
        });

        const removeUserSignedOut = userManager.events.addUserSignedOut(() => {
            if (active) {
                transitionToSignedOut();
            }
        });

        const removeAccessTokenExpiring = userManager.events.addAccessTokenExpiring(() => {
            void renewTokenRef.current();
        });

        const removeAccessTokenExpired = userManager.events.addAccessTokenExpired(() => {
            const user = currentUserRef.current;
            if (!user || user.expired) {
                transitionToExpired({ requiresReauth: reauthRequiredRef.current });
            }
        });

        const removeSilentRenewError = userManager.events.addSilentRenewError((error) => {
            const terminal = isTerminalRenewError(error);
            if (terminal) {
                reauthRequiredRef.current = true;
                setReauthRequired(true);
            }

            const user = currentUserRef.current;
            if (!user || user.expired) {
                transitionToExpired({ requiresReauth: terminal });
            }
        });

        const bootstrapped = bootstrap();
        const seenCallbacks = new Set<string>();
        const finishIosSignIn = async (url: string) => {
            const callback = parseIosAuthCallback(url);
            if (!callback || !active || seenCallbacks.has(callback.state)) return;
            seenCallbacks.add(callback.state);

            await bootstrapped;
            if (!active) return;
            try {
                const user = await userManager.signinRedirectCallback(callback.url);
                if (!active) return;
                transitionToAuthenticated(user);
            } catch {
                if (!active) return;
                setSignInFailed(true);
            }
            history.replace('/profile');
        };
        const iosListener = useIosAuthCallback
            ? App.addListener('appUrlOpen', ({ url }) => {
                  void finishIosSignIn(url);
              })
            : undefined;
        if (iosListener) {
            // The callback can launch a terminated app or resume an already running one.
            void iosListener
                .then(async () => App.getLaunchUrl())
                .then(async (launch) => {
                    if (launch) return finishIosSignIn(launch.url);
                })
                .catch(() => {
                    if (active) setSignInFailed(true);
                });
        }

        return () => {
            active = false;
            void iosListener?.then(async (listener) => listener.remove()).catch(() => undefined);
            removeUserLoaded();
            removeUserUnloaded();
            removeUserSignedOut();
            removeAccessTokenExpiring();
            removeAccessTokenExpired();
            removeSilentRenewError();
        };
    }, [history, renewUser, transitionToAuthenticated, transitionToExpired, transitionToSignedOut]);

    const value = useMemo<SessionContextValue>(
        () => ({
            expire,
            getToken,
            isAuthenticated: status === 'authenticated',
            isLoading: status === 'loading',
            profile: currentUser?.profile ?? null,
            renewToken,
            signIn,
            signInFailed,
            signOut,
            token: getUserToken(currentUser),
            user: currentUser,
        }),
        [currentUser, expire, getToken, renewToken, signIn, signInFailed, signOut, status]
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>{children}</SessionProvider>
);
