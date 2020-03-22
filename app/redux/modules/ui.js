import { TOGGLE_ZOOM_CONTROL } from 'constants/actionTypes';

const initialState = {
    zoomControlShown: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ZOOM_CONTROL:
            return {
                ...state,
                zoomControlShown: !state.zoomControlShown,
            };

        default:
            return state;
    }
}
