import { useQuery } from 'react-query';

const fetchSaint = (key, { saintId }) =>
    fetch(`https://psmb.ru/sv/${saintId}.html?json=1`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });

const useSaint = saintId => useQuery(['saint', { saintId }], fetchSaint, { retry: false });

export default useSaint;
