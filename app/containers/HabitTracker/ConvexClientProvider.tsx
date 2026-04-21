import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { useSession } from 'containers/AuthProvider';

const convexUrl = process.env.CONVEX_URL || '';

export const ConvexClientProvider = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    const sessionRef = useRef(session);
    sessionRef.current = session;
    const client = useMemo(() => new ConvexReactClient(convexUrl), []);
    const appliedAuthRef = useRef<string | null>(null);

    useLayoutEffect(() => {
        const token = session.token;
        if (!token) {
            if (session.status === 'signedOut' || session.status === 'expired') {
                if (appliedAuthRef.current === 'cleared') {
                    return;
                }
                client.clearAuth();
                appliedAuthRef.current = 'cleared';
            }
            return;
        }

        if (appliedAuthRef.current === token) {
            return;
        }

        client.setAuth(async ({ forceRefreshToken }) => {
            const currentSession = sessionRef.current;
            const currentToken = currentSession.token;
            const currentUser = currentSession.user;
            if (forceRefreshToken) {
                if (currentToken && currentUser && !currentUser.expired) {
                    return currentToken;
                }

                try {
                    const user = await currentSession.renew();
                    return user?.expired ? null : user?.id_token ?? null;
                } catch {
                    return null;
                }
            }

            return currentUser?.expired ? null : currentToken;
        });
        appliedAuthRef.current = token;
    }, [client, session.status, session.token]);

    useLayoutEffect(() => {
        return () => {
            void client.close();
        };
    }, [client]);

    return <ConvexProvider client={client}>{children}</ConvexProvider>;
};
