import fetch from 'isomorphic-fetch';

import { GET_DAY, GET_DAY_ERROR, GET_DAY_SUCCESS } from '../../constants/actionTypes';

export function fetchDay(date) {
    return fetch(`http://localhost:3000/api/day/${date}`)
        .then(response => {
            if (response.status > 400) throw new Error('Error on fetch day.');

            return response.json();
        })
        .then(res => {
            let day = {};
            if (res) {
                const { comment, lent, prayers, readings, saints, seromns, title } = res;

                day = {
                    comment,
                    lent,
                    prayers,
                    readings,
                    saints,
                    seromns,
                    title,
                };
            }

            return {
                date: date,
                day,
            };
        });
}

export default function getDay(date) {
    return dispatch => {
        dispatch({
            type: GET_DAY,
        });

        return fetchDay(date)
            .then(payload => {
                return dispatch({
                    type: GET_DAY_SUCCESS,
                    payload,
                });
            })
            .catch(error => {
                const errorMessage = error.message || 'Ошибка при загрузке чтений';
                dispatch({
                    type: GET_DAY_ERROR,
                    payload: { error: errorMessage },
                });

                throw new Error(errorMessage);
            });
    };
}
