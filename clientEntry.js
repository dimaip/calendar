import 'babel-polyfill';
import Transmit from 'react-transmit';
import {Router} from 'react-router';
import routes from 'reducers/routes';
import {browserHistory} from 'react-router';

Transmit.render(
  Router,
  {history: browserHistory, routes},
  document.getElementById('app')
);
