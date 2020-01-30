import { SET_ZOOM } from 'constants/actionTypes';

const initialState = {
    zoom: 1,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ZOOM:
            return {
                ...state,
                zoom: action.payload.zoom,
            };

        default:
            return state;
    }
}
