import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

export interface Hymn {
    id: string;
    title: string;
    bodytext: {
        ru?: string;
        eng?: string;
    };
}

export async function fetchHymns() {
    return cachedFetch(`${process.env.API_HOST}/hymns`) as Promise<Hymn[]>;
}

const useHymns = () => useQuery(['hymns', {}], async () => fetchHymns(), { retry: false });

export default useHymns;
