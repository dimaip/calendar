import { useCallback, useRef } from 'react';
import { useSession } from 'containers/AuthProvider';

export const useAuthorisedFetch = () => {
    const session = useSession();
    const sessionRef = useRef(session);
    sessionRef.current = session;

    return useCallback(
        async <T>({
            url,
            body,
            method = 'GET',
        }: {
            url: string;
            body?: unknown;
            method?: 'GET' | 'POST';
        }): Promise<T | null> => {
            const currentSession = sessionRef.current;
            const token = currentSession.token;
            if (!token) {
                return null;
            }

            const doFetch = async (activeToken: string) =>
                fetch(`${process.env.API_HOST}${url}`, {
                    headers: {
                        Authorization: `Bearer ${activeToken}`,
                        ...(body ? { 'Content-Type': 'application/json' } : {}),
                    },
                    method,
                    ...(body
                        ? {
                              body: JSON.stringify(body),
                          }
                        : {}),
                });

            return doFetch(token).then(async (resp) => {
                if (!resp.ok && resp.status === 401) {
                    const user = await currentSession.renew();
                    const newToken = user?.id_token;
                    if (!newToken) {
                        void currentSession.expire();
                        throw Error('Bad Token, failed to refresh');
                    }

                    return doFetch(newToken).then((renewedResp) => {
                        if (!renewedResp.ok && renewedResp.status === 401) {
                            void currentSession.expire();
                            throw Error('Bad Token, new token failed');
                        }
                        return renewedResp.json() as T;
                    });
                }
                return resp.json() as T;
            });
        },
        []
    );
};
