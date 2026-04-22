import React, { useEffect, useMemo, useRef } from 'react';
import { ConvexProviderWithAuth, ConvexReactClient } from 'convex/react';
import { useSession } from 'containers/AuthProvider';

const convexUrl = process.env.CONVEX_URL || '';

const useSessionAuth = () => {
    const session = useSession();
    const sessionRef = useRef(session);
    sessionRef.current = session;

    return useMemo(
        () => ({
            // Convex owns the reconnect/auth handshake. This hook only translates
            // those callbacks into our session contract.
            fetchAccessToken: async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
                const currentSession = sessionRef.current;
                return forceRefreshToken ? currentSession.renewToken() : currentSession.getToken();
            },
            isAuthenticated: session.isAuthenticated,
            isLoading: session.isLoading,
        }),
        [session.isAuthenticated, session.isLoading]
    );
};

export const ConvexClientProvider = ({ children }: { children: React.ReactNode }) => {
    const client = useMemo(() => new ConvexReactClient(convexUrl), []);

    useEffect(() => {
        return () => {
            void client.close();
        };
    }, [client]);

    return (
        <ConvexProviderWithAuth client={client} useAuth={useSessionAuth}>
            {children}
        </ConvexProviderWithAuth>
    );
};
