import { combineReducers } from 'redux';
import days from './days';
import readings from './readings';
import settings from './settings';
import externalDays from './externalDays';
import ui from './ui';

const rootReducer = combineReducers({
    days,
    readings,
    settings,
    externalDays,
    ui,
});

export default rootReducer;
