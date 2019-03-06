import fetch from 'isomorphic-fetch'

import {
    GET_READING,
    GET_READING_ERROR,
    GET_READING_SUCCESS
} from '../../constants/actionTypes';


export function fetchReading(link) {
    return fetch(`http://localhost:3000/api/reading/` + encodeURI(link))
        .then(response => {
                if (response.status > 400)
                    throw new Error("Error on fetch reading.");

                return response.json();
            }
        )
        .then(res => {
                let reading = {};
                if (res) {
                    const {
                        bookKey,
                        bookName,
                        chapCount,
                        fragments,
                        translationCurrent,
                        translationList,
                        verseKey
                    } = res;

                    reading = {
                        bookKey,
                        bookName,
                        chapCount,
                        fragments,
                        translationCurrent,
                        translationList,
                        verseKey
                    }
                }

                return {
                    "link": link,
                    reading
                };
            }
        );

}

export default function getReading(link) {
    return dispatch => {
        dispatch({
            type: GET_READING
        });

        return fetchReading(link)
            .then(payload => {
                    return dispatch({
                        type: GET_READING_SUCCESS,
                        payload
                    });
                }
            )
            .catch(error => {
                const errorMessage = error.message || 'Ошибка при загрузке текста чтений';
                dispatch({
                    type: GET_READING_ERROR,
                    payload: {error: errorMessage}
                });

                throw new Error(errorMessage);
            });
    };
}