import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import type { SermonDetail } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';

const fetchSermon = async (sermonId: string): Promise<SermonDetail | null> =>
    fetch(`https://psmb.ru/s/${sermonId}.html?format=json`).then((response) => {
        if (!response.ok) {
            return null;
        }
        return response.json() as Promise<SermonDetail>;
    });

const useSermon = (sermonId: string): UseQueryResult<SermonDetail | null, Error> =>
    useQuery<SermonDetail | null>({
        queryKey: queryKeys.sermon(sermonId),
        queryFn: async () => fetchSermon(sermonId),
        retry: false,
        enabled: Boolean(sermonId),
    });

export default useSermon;
