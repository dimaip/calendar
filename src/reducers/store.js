import {createStore, applyMiddleware, compose} from 'redux';
import {fromJS} from 'immutable';
import thunk from 'redux-thunk';
import appReducer from './reducer';

const initialState = {};
if (typeof (window) !== 'undefined') {
  const fromServer = window.__INITIAL_STATE__;
  initialState.main = fromJS(fromServer.main);
}

let store = null;

export default function getStore() {
  if (!store) {
    const devToolsMiddleware = () => typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;
    store = compose(
      applyMiddleware(thunk),
      devToolsMiddleware()
    )(createStore)(appReducer, initialState);
  }
  return store;
}
