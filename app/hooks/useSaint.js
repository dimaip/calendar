import { useQuery } from 'react-query';

const fetchSaint = ({ saintId }) =>
    fetch(`${process.env.PUBLIC_URL}/api/saint/${saintId}`).then(response => {
        if (response.status > 400) throw new Error('Error on fetch day.');

        return response.json();
    });

const useSaint = saintId => useQuery(['saint', { saintId }], fetchSaint);

export default useSaint;
