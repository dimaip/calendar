import { GET_EXTERNAL_DAY, GET_EXTERNAL_DAY_SUCCESS, GET_EXTERNAL_DAY_ERROR } from '../../constants/actionTypes';

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_EXTERNAL_DAY: {
            const { date } = action.payload;
            return {
                ...state,
                [date]: {
                    ...(state?.[date] || {}),
                    loading: true,
                    error: '',
                },
            };
        }

        case GET_EXTERNAL_DAY_ERROR: {
            const { date, error } = action.payload;
            return {
                ...state,
                [date]: {
                    ...(state?.[date] || {}),
                    loading: false,
                    error,
                },
            };
        }

        case GET_EXTERNAL_DAY_SUCCESS: {
            const { date, externalDay } = action.payload;
            return {
                ...state,
                [date]: {
                    ...(state?.[date] || {}),
                    data: externalDay,
                    loading: false,
                },
            };
        }

        default:
            return state;
    }
}
