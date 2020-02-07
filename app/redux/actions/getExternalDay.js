import fetch from 'isomorphic-fetch';

import { GET_EXTERNAL_DAY, GET_EXTERNAL_DAY_ERROR, GET_EXTERNAL_DAY_SUCCESS } from '../../constants/actionTypes';

export function fetchExternalDay(date) {
    return fetch(`/api/external-day/${date}`).then(response => {
        if (response.status > 400) throw new Error('Error on fetch external day.');

        return response.json();
    });
}

export default function getExternalDay(date) {
    return dispatch => {
        dispatch({
            type: GET_EXTERNAL_DAY,
            payload: {
                date,
            },
        });

        return fetchExternalDay(date)
            .then(externalDay => {
                return dispatch({
                    type: GET_EXTERNAL_DAY_SUCCESS,
                    payload: {
                        externalDay,
                        date,
                    },
                });
            })
            .catch(error => {
                const errorMessage = error.message || 'Ошибка при загрузке проповеди';
                dispatch({
                    type: GET_EXTERNAL_DAY_ERROR,
                    payload: { date, error: errorMessage },
                });

                throw new Error(errorMessage);
            });
    };
}
