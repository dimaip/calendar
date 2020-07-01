import { SET_ZOOM, DISMISS_IOS_PROMPT } from 'constants/actionTypes';

const initialState = {
    zoom: 1,
    iosPromptDismissed: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ZOOM:
            return {
                ...state,
                zoom: action.payload.zoom,
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
