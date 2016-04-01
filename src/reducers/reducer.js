import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';
import main from './modules/main';

export default combineReducers({
  main,
  routing: routeReducer
});
