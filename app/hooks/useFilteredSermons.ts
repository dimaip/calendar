import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

export interface Sermon {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    teaser: string;
    bodytext: string;
    date?: string;
}

const fetchFilteredSermons = async (authorId?: string, themeId?: string, limit?: number): Promise<Sermon[]> => {
    const url = new URL('https://psmb.ru/?listSermons=1');

    if (authorId) {
        url.searchParams.append('author', authorId);
    }

    if (themeId) {
        url.searchParams.append('theme', themeId);
    }

    if (limit) {
        url.searchParams.append('limit', limit.toString());
    }

    return cachedFetch(url.toString());
};

const useFilteredSermons = (authorId?: string, themeId?: string, limit?: number) =>
    useQuery(
        ['filtered-sermons', { authorId, themeId, limit }],
        async () => fetchFilteredSermons(authorId, themeId, limit),
        {
            retry: false,
        }
    );

export default useFilteredSermons;
