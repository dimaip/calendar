import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

const fetchSaint = (saintId) => cachedFetch(`https://psmb.ru/sv/${saintId}.html?json=1`);

const useSaint = (saintId) => useQuery(['saint', { saintId }], () => fetchSaint(saintId), { retry: false });

export default useSaint;
