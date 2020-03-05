import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from 'containers/Main/Main.js';
import NotFound from 'components/NotFound/NotFound.js';
import Readings from 'containers/Readings/Readings';
import dateFormat from 'dateformat';
import Sermon from 'containers/Sermon/Sermon';
import Saint from 'containers/Saint/Saint';
import ThisDay from 'containers/ThisDay/ThisDay';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import Service from 'containers/Service/Service';
import Tracker from 'components/Tracker/Tracker';

export default (
    <div>
        <ScrollToTop />
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
                <Tracker>
                    <Main />
                </Tracker>
            </Route>
            <Route exact path="/date/:date/services">
                <Tracker>
                    <Main services />
                </Tracker>
            </Route>
            <Route exact path="/date/:date/readings/:service">
                <Tracker>
                    <Readings />
                </Tracker>
            </Route>
            <Route exact path="/date/:date/bReadings/:service">
                <Tracker>
                    <Readings brother />
                </Tracker>
            </Route>
            <Route exact path="/date/:date/sermon/:sermonId">
                <Tracker>
                    <Sermon />
                </Tracker>
            </Route>
            <Route exact path="/date/:date/saint/:saintId">
                <Tracker>
                    <Saint />
                </Tracker>
            </Route>
            <Route exact path="/date/:date/thisday/:thisDayId">
                <Tracker>
                    <ThisDay />
                </Tracker>
            </Route>
            <Route exact path="/date/:date/service/:serviceId">
                <Tracker>
                    <Service />
                </Tracker>
            </Route>
            <Route>
                <Tracker>
                    <NotFound />
                </Tracker>
            </Route>
        </Switch>
    </div>
);
