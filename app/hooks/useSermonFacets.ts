import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

export interface SermonTag {
    id: string;
    title: string;
    count: number;
}

export interface SermonFacets {
    authors: SermonTag[];
    themes: SermonTag[];
}

const fetchSermonFacets = async (): Promise<SermonFacets> => cachedFetch('https://psmb.ru/?facets=1');

const useSermonFacets = () =>
    useQuery(['sermon-facets'], async () => fetchSermonFacets(), {
        retry: false,
    });

export default useSermonFacets;
