import fetch from 'isomorphic-fetch';

import { GET_DAY, GET_DAY_ERROR, GET_DAY_SUCCESS } from '../../constants/actionTypes';
import { getFeastInfo, getLentInfo } from 'domain/getDayInfo';

export function fetchDay(date) {
    return fetch(`/api/day/${date}`)
        .then(response => {
            if (response.status > 400) throw new Error('Error on fetch day.');

            return response.json();
        })
        .then(res => {
            let day = {};
            if (res) {
                const { comment, prayers, readings, bReadings, saints, seromns, title, glas, week } = res;

                const { colour: feastColour, icon: feastIcon } = getFeastInfo(new Date(date));
                const { fastName, fastingLevelName, colour: lentColour, icon: lentIcon } = getLentInfo(new Date(date));

                day = {
                    comment,
                    fastName,
                    fastingLevelName,
                    prayers,
                    readings,
                    bReadings,
                    saints: saints
                        // TODO: move this server-side
                        .replace(
                            /\/typo3conf\/ext\/orthodox\/Resources\/Public\/Icons\/(\w).gif/g,
                            '/static/icons/$1.svg'
                        )
                        .replace(/(?:\r\n|\r|\n)/g, '<br>'),
                    seromns,
                    title,
                    glas,
                    week,
                    colour: feastColour || lentColour,
                    icon: feastIcon || lentIcon,
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
            payload: { date },
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
                    payload: { date, error: errorMessage },
                });

                throw new Error(errorMessage);
            });
    };
}
