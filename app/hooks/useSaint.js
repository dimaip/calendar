import { useQuery } from 'react-query';

const fetchSaint = (key, { saintId }) =>
    fetch(`${process.env.PUBLIC_URL}/api/saint/${saintId}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });

const useSaint = saintId => useQuery(['saint', { saintId }], fetchSaint, {retry: false});

export default useSaint;
