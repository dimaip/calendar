import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from 'containers/Main/Main.js';
import NotFound from 'components/NotFound/NotFound.js';
import Readings from 'containers/Readings/Readings';
import dateFormat from 'dateformat';

export default (
    <div>
        <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    const date = dateFormat(new Date(), 'yyyy-mm-dd');
                    return <Redirect to={`/date/${date}`} />;
                }}
            />
            <Route exact path="/date/:date" component={Main} />
            <Route exact path="/date/:date/readings/:service" component={Readings} />
            <Route component={NotFound} />
        </Switch>
    </div>
);
