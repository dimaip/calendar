import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import type { AppConfig } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';

export async function fetchApp(): Promise<AppConfig> {
    return fetch(`${process.env.API_HOST}/app`).then(async (res) => res.json() as Promise<AppConfig>);
}

const useApp = (): UseQueryResult<AppConfig, Error> =>
    useQuery<AppConfig>({
        queryKey: queryKeys.app(),
        queryFn: fetchApp,
        retry: false,
    });

export default useApp;
