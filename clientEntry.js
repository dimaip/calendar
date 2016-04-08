import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import getRoutes from 'reducers/routes';
import getStore from 'reducers/store';
import {browserHistory} from 'react-router';

const store = getStore();
const routes = getRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
