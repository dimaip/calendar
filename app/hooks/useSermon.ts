import { useQuery } from 'react-query';

import { Sermon } from './useFilteredSermons';

import cachedFetch from 'utils/cachedFetch';

const fetchSermon = async (sermonId: string): Promise<Sermon | null> =>
    cachedFetch<Sermon>(`https://psmb.ru/s/${sermonId}.html?format=json`).catch((error: unknown) => {
        if (error instanceof Error && error.cause instanceof Response) return null;
        throw error;
    });

const useSermon = (sermonId: string) =>
    useQuery(['sermon', { sermonId }], async () => fetchSermon(sermonId), {
        retry: false,
        enabled: Boolean(sermonId),
    });

export default useSermon;
