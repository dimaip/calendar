import { SET_ZOOM, DISMISS_IOS_PROMPT, SET_LANGUAGE } from 'constants/actionTypes';

const initialState = {
    zoom: 1,
    iosPromptDismissed: false,
    language: 'default',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ZOOM:
            return {
                ...state,
                zoom: action.payload.zoom,
            };
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload.language,
            };
        case DISMISS_IOS_PROMPT:
            return {
                ...state,
                iosPromptDismissed: action.payload.timestamp,
            };

        default:
            return state;
    }
}
