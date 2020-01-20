import { GET_READING, GET_READING_SUCCESS, GET_READING_ERROR } from '../../constants/actionTypes';

const initialState = {
    // FORMAT:
    // readings: {
    //     "<text link>": {
    //          ...
    //     },
    //     ...
    // }
    readings: {},
    error: '',
};

export default function readingsState(state = initialState, action) {
    switch (action.type) {
        case GET_READING:
            return {
                ...state,
                error: '',
            };

        case GET_READING_ERROR:
            return {
                ...state,
                error: action.payload.error,
            };

        case GET_READING_SUCCESS: {
            const readings = { ...state.readings };
            const { link, reading } = action.payload;
            readings[link] = reading;
            return { ...state, readings };
        }

        default:
            return state;
    }
}
