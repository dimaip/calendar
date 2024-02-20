import { useAuth } from 'oidc-react';

export const useAuthorisedFetch = () => {
    const auth = useAuth();
    const token = auth?.userData?.id_token;
    return async <T>({
        url,
        body,
        method = 'GET',
    }: {
        url: string;
        body?: unknown;
        method?: 'GET' | 'POST';
    }): Promise<T | null> => {
        if (token) {
            const doFetch = async (token: string) =>
                fetch(`${process.env.API_HOST}${url}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    method,
                    ...(body
                        ? {
                              body: JSON.stringify(body),
                          }
                        : {}),
                });
            return doFetch(token).then(async (resp) => {
                if (!resp.ok && resp.status === 401) {
                    console.warn('Expried, re-trying');
                    const user = await auth?.userManager?.signinSilent();
                    const newToken = user?.id_token;
                    if (!newToken) {
                        console.warn('Bad token recieved, signing out');
                        void auth.signOut();
                        throw Error('Bad Token, failed to refresh');
                    }

                    return doFetch(newToken).then((resp) => {
                        if (!resp.ok && resp.status === 401) {
                            console.warn('Bad token, signing out');
                            void auth.signOut();
                            throw Error('Bad Token, new token failed');
                        }
                        return resp.json() as T;
                    });
                }
                return resp.json() as T;
            });
        }
        return null;
    };
};
