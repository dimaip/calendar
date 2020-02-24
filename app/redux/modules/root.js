import { combineReducers } from 'redux';
import settings from './settings';
import ui from './ui';

const rootReducer = combineReducers({
    settings,
    ui,
});

export default rootReducer;
