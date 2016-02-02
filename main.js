import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import routes from 'redux/routes';
import getStore from 'redux/store';
import getHistory from 'redux/history';

const history = getHistory();
const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
