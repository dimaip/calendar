import {createStore, applyMiddleware, compose} from 'redux';
import {syncHistory} from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import appReducer from './reducer';
import getHistory from './history';

const history = getHistory();

let store = null;

export default function getStore() {
  if (!store) {
    const devToolsMiddleware = () => typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;
    const reduxRouterMiddleware = syncHistory(history);
    store = compose(
      applyMiddleware(promiseMiddleware, reduxRouterMiddleware),
      devToolsMiddleware()
    )(createStore)(appReducer);
  }
  return store;
}
