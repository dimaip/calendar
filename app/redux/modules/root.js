import { combineReducers } from 'redux';
import days from './days';
import readings from './readings';

const rootReducer = combineReducers({
    days,
    readings,
});

export default rootReducer;
