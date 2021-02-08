import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

const fetchSaint = (key, { saintId }) => cachedFetch(`https://psmb.ru/sv/${saintId}.html?json=1`);

const useSaint = (saintId) => useQuery(['saint', { saintId }], fetchSaint, { retry: false });

export default useSaint;
