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
            return fetch(`${process.env.API_HOST}${url}`, {
                headers: { Authorization: `Bearer ${token}` },
                method,
                ...(body
                    ? {
                          body: JSON.stringify(body),
                      }
                    : {}),
            }).then((resp) => {
                if (!resp.ok && resp.status === 401) {
                    console.warn('Bad token, signing out');
                    void auth.signOut();
                    throw Error('Bad Token');
                }
                return resp.json() as T;
            });
        }
        return null;
    };
};
