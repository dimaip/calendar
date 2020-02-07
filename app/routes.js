import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from 'containers/Main/Main.js';
import NotFound from 'components/NotFound/NotFound.js';
import Readings from 'containers/Readings/Readings';
import dateFormat from 'dateformat';
import Sermon from 'containers/Sermon/Sermon';

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
            <Route exact path="/date/:date">
                <Main />
            </Route>
            <Route exact path="/date/:date/readings/:service">
                <Readings />
            </Route>
            <Route exact path="/date/:date/bReadings/:service">
                <Readings brother />
            </Route>
            <Route exact path="/date/:date/sermon/:sermonId">
                <Sermon />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    </div>
);
