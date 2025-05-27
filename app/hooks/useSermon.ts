import { useQuery } from 'react-query';

import { Sermon } from './useFilteredSermons';

const fetchSermon = async (sermonId: string): Promise<Sermon | null> =>
    fetch(`https://psmb.ru/s/${sermonId}.html?format=json`).then((response) => {
        if (!response.ok) {
            return null;
        }
        return (response.json() as unknown) as Sermon;
    });

const useSermon = (sermonId: string) =>
    useQuery(['sermon', { sermonId }], async () => fetchSermon(sermonId), {
        retry: false,
        enabled: Boolean(sermonId),
    });

export default useSermon;
