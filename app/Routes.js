import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Main from 'containers/Main/Main.js';
import NotFound from 'components/NotFound/NotFound.js';
import Readings from 'containers/Readings/Readings';
import dateFormat from 'dateformat';
import Sermon from 'containers/Sermon/Sermon';
import Saint from 'containers/Saint/Saint';
import ThisDay from 'containers/ThisDay/ThisDay';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import Service from 'containers/Service/Service';
import { css } from 'emotion';
import getVersion from './getVersion';

export default () => {
    const history = useHistory();
    history.listen(async () => {
        const version = await getVersion();

        // VERSION is a global constant injected by webpack
        // @ts-ignore
        if (version && version !== VERSION) {
            console.log('New version, reloading');
            location.reload();
        }
    });
    return (
        <div
            className={css`
                max-width: 640px;
                margin: 0 auto;
            `}
        >
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
                    <Main />
                </Route>
                <Route exact path="/date/:date/services">
                    <Main services />
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
                <Route exact path="/date/:date/saint/:saintId">
                    <Saint />
                </Route>
                <Route exact path="/date/:date/thisday/:thisDayId">
                    <ThisDay />
                </Route>
                <Route exact path="/date/:date/service/:serviceId">
                    <Service />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
};
