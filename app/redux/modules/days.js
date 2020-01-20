import { GET_DAY, GET_DAY_SUCCESS, GET_DAY_ERROR } from '../../constants/actionTypes';

const initialState = {
    loaded: false,
    // FORMAT:
    // days: {
    //     "2017-12-31": {
    //         "title": null,
    //         "readings": {
    //             "<type>": {
    //                 "<type1>": "link1?",
    //                 "<type2>": "link2?"
    //             }
    //         },
    //         "saints": "...",
    //         "prayers": "...",
    //         "seromns": "...",
    //         "lent": "...",
    //         "comment": "..."
    //     },
    //     ...
    // }
    date: '',
    day: {},
    days: {},
    error: '',
};

export default function daysState(state = initialState, action) {
    switch (action.type) {
        case GET_DAY:
            return {
                ...state,
                loaded: false,
                error: '',
            };

        case GET_DAY_ERROR:
            return {
                ...state,
                loaded: true,
                error: action.payload.error,
            };

        case GET_DAY_SUCCESS: {
            const days = { ...state.readings };
            const { date, day } = action.payload;
            days[date] = day;
            return { ...state, days, date, day, loaded: true };
        }

        default:
            return state;
    }
}
