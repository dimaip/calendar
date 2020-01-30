import { combineReducers } from 'redux';
import days from './days';
import readings from './readings';
import settings from './settings';
import ui from './ui';

const rootReducer = combineReducers({
    days,
    readings,
    settings,
    ui,
});

export default rootReducer;
