import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import dateFormat from 'dateformat';
import Main from 'containers/Main/Main';
import Root from 'containers/Root';

const routes = (
  <Route path='/' component={Root} >
    <IndexRedirect to={'/' + dateFormat(new Date(), 'yyyy-mm-dd')} />
    <Route path=':date' component={Main} />
  </Route>
);

export default routes;
