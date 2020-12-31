import React from 'react';
import { Route, Switch, Redirect, useHistory, useParams } from 'react-router-dom';
import Main from 'containers/Main/Main.js';
import NotFound from 'components/NotFound/NotFound.js';
import Readings from 'containers/Readings/Readings';
import dateFormat from 'dateformat';
import Sermon from 'containers/Sermon/Sermon';
import Saint from 'containers/Saint/Saint';
import ThisDay from 'containers/ThisDay/ThisDay';
import Service from 'containers/Service/Service';
import { Global, css as rcss } from '@emotion/react';
import checkVersion from './checkVersion';
import useDay from 'hooks/useDay';
import getTheme from 'styles/getTheme';
import { ThemeProvider } from 'emotion-theming';
import { css } from 'emotion';
import langState from 'state/langState';
import { useRecoilValue } from 'recoil';
import { LangContext } from 'containers/Service/LangContext';
import themeState from 'state/themeState';

const DateRoutes = () => {
    const themeStateValue = useRecoilValue(themeState);
    const { date } = useParams();
    const { data: day } = useDay(date);
    const theme = getTheme(day?.colour, themeStateValue);
    const langStateValue = useRecoilValue(langState);
    return (
        <LangContext.Provider value={langStateValue}>
            <ThemeProvider theme={theme}>
                <Global
                    styles={rcss`
                    body {
                        color: ${theme.colours.darkGray};
                        background-color: ${theme.colours.white};
                    }
                `}
                />
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
        </LangContext.Provider>
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
