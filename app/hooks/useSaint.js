import { useQuery } from 'react-query';

const useSaint = saintId =>
    useQuery(`saint-${saintId}`, () =>
        fetch(`/api/saint/${saintId}`).then(response => {
            if (response.status > 400) throw new Error('Error on fetch day.');

            return response.json();
        })
    );

export default useSaint;
