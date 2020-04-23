import { SET_LANGUAGE } from 'constants/actionTypes';

export function setLanguage(language) {
    return {
        type: SET_LANGUAGE,
        payload: { language },
    };
}
