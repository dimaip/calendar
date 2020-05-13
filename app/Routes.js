import React from 'react';
import { Route, Switch, Redirect, useHistory, useParams } from 'react-router-dom';
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
import checkVersion from './checkVersion';
import useDay from 'hooks/useDay';
import getTheme from 'styles/theme';
import { ThemeProvider } from 'emotion-theming';

const DateRoutes = () => {
    const { date } = useParams();
    const { data: day } = useDay(date);
    const theme = getTheme(day?.colour);
    return (
        <ThemeProvider theme={theme}>
            <Switch>
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
        </ThemeProvider>
    );
};

export default () => {
    const history = useHistory();
    history.listen(checkVersion);
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
                <Route path="/date/:date">
                    <DateRoutes />
                </Route>
            </Switch>
        </div>
    );
};
