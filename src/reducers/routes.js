import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import Main from 'containers/Main/Main';
import Reading from 'containers/Reading/Reading';
import Root from 'containers/Root';
import today from 'helpers/today';

const routes = (
  <Route path='/' component={Root}>
    <IndexRedirect to={today} />
    <Route path='/:date' component={Main} onEnter={nextProps => Main.getFragment('data', {date: nextProps.params.date})}/>
    <Route path='/:date/read/:service' component={Reading}/>
  </Route>
);
export default routes;
