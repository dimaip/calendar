import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface Result<T> {
    error: null | Error;
    loading: boolean;
    data: null | T;
}

export const useApi = <T>(url: string): Result<T> & { refresh: () => void } => {
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState<Result<T>>({
        error: null,
        loading: true,
        data: null,
    });
    const [refreshIndex, setRefreshIndex] = useState(0);

    useEffect(() => {
        void (async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    // audience: 'https://payments.molitva.app',
                    // scope: 'read:profile',
                });
                console.log(accessToken);
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setState({
                    ...state,
                    data: (await res.json()) as T,
                    error: null,
                    loading: false,
                });
            } catch (error) {
                setState({
                    ...state,
                    error: error as Error,
                    loading: false,
                });
            }
        })();
    }, [refreshIndex]);

    return {
        ...state,
        refresh: () => setRefreshIndex(refreshIndex + 1),
    };
};
