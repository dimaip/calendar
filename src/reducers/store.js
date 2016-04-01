import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import appReducer from './reducer';

let store = null;

export default function getStore() {
  if (!store) {
    const devToolsMiddleware = () => typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;
    store = compose(
      applyMiddleware(promiseMiddleware),
      devToolsMiddleware()
    )(createStore)(appReducer);
  }
  return store;
}
