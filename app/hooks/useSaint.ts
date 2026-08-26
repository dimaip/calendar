import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import cachedFetch from 'utils/cachedFetch';
import type { Saint } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';

const fetchSaint = async (saintId: string): Promise<Saint> =>
    cachedFetch<Saint>(`https://psmb.ru/sv/${saintId}.html?json=1`);

const useSaint = (saintId: string): UseQueryResult<Saint, Error> =>
    useQuery<Saint>({
        queryKey: queryKeys.saint(saintId),
        queryFn: async () => fetchSaint(saintId),
        retry: false,
    });

export default useSaint;
