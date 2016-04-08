import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import Main from 'containers/Main/Main';
import Reading from 'containers/Reading/Reading';
import Root from 'containers/Root';
import today from 'helpers/today';
import {fetchDate} from 'reducers/modules/main';

const getRoutes = store => {
  return (
    <Route path='/' component={Root}>
      <IndexRedirect to={today} />
      <Route path='/:date' component={Main} onEnter={nextProps => store.dispatch(fetchDate(nextProps.params.date))}/>
      <Route path='/:date/read/:service' component={Reading} onEnter={nextProps => store.dispatch(fetchDate(nextProps.params.date))}/>
    </Route>
  );
};

export default getRoutes;
