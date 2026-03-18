import React, { useEffect, useRef, useState } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { useAuth } from 'oidc-react';

const convexUrl = process.env.CONVEX_URL || '';

const convex = new ConvexReactClient(convexUrl);

const ConvexAuthSync = () => {
    const auth = useAuth();
    const authRef = useRef(auth);
    authRef.current = auth;
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        // Wait until we actually have a token before setting up Convex auth
        if (!auth.userData?.id_token) return;
        if (authReady) return;

        setAuthReady(true);
        convex.setAuth(
            async ({ forceRefreshToken }) => {
                const currentAuth = authRef.current;
                if (forceRefreshToken) {
                    try {
                        const user = await currentAuth.userManager.signinSilent();
                        return user?.id_token ?? null;
                    } catch {
                        return null;
                    }
                }
                return currentAuth.userData?.id_token ?? null;
            },
            (_isAuthenticated) => {}
        );
    }, [auth.userData?.id_token, authReady]);

    return null;
};

export const ConvexClientProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConvexProvider client={convex}>
            <ConvexAuthSync />
            {children}
        </ConvexProvider>
    );
};
