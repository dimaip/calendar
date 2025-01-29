import React, { useContext } from 'react';
import { Route, Switch, Redirect, useHistory, useParams, useLocation } from 'react-router-dom';
import Main from 'containers/Main/Main';
import NotFound from 'components/NotFound/NotFound';
import Readings from 'containers/Readings/Readings';
import dateFormat from 'dateformat';
import Sermon from 'containers/Sermon/Sermon';
import Saint from 'containers/Saint/Saint';
import ThisDay from 'containers/ThisDay/ThisDay';
import Service from 'containers/Service/Service';
import { Global, css as rcss } from '@emotion/react';
import useDay from 'hooks/useDay';
import getTheme from 'styles/getTheme';
import { ThemeProvider } from 'emotion-theming';
import { css } from 'emotion';
import langState from 'state/langState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LangContext } from 'containers/Service/LangContext';
import pendingUpdateState from 'state/pendingUpdateState';
import UpdatePrompt from 'components/UpdatePrompt/UpdatePrompt';
import isParallelState from 'state/isParallel';
import { Promo } from 'components/Promo/Promo';
import { Hymns } from 'containers/Hymns/Hymns';
import { Hymn } from 'containers/Hymns/Hymn';
import Profile from 'containers/Profile/Profile';
import AddSharedVersion from 'containers/AddSharedVersion/AddSharedVersion';
import { ScriptEditorPromo } from 'components/ScriptEditorPromo/ScriptEditorPromo';
import Loader from 'components/Loader/Loader';
import themeState from 'state/themeState';

import checkVersion from './checkVersion';

const DateRoutes = () => {
    const { date } = useParams();
    const themeStateValue = useRecoilValue(themeState);

    const tomorrowDateObj = new Date(date);
    tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
    const tomorrowDate = dateFormat(tomorrowDateObj, 'yyyy-mm-dd');

    const isVespers = document.location.href.includes('vespers');
    const { data: day } = useDay(isVespers ? tomorrowDate : date);
    const theme = getTheme(day?.colour, themeStateValue);

    return (
        <ThemeProvider theme={theme}>
            <Promo>
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
                    <Route exact path="/date/:date/service/:serviceId/:prayerId?">
                        <Service />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
                <UpdatePrompt />
                <ScriptEditorPromo />
            </Promo>
        </ThemeProvider>
    );
};

export default () => {
    const langStateValue = useRecoilValue(langState);
    const history = useHistory();
    const setPendingUpdate = useSetRecoilState(pendingUpdateState);
    history.listen(async () => {
        const newVersion = await checkVersion();
        if (newVersion) {
            setPendingUpdate(newVersion);
        }
    });
    const isParallel = useRecoilValue(isParallelState);
    const themeStateValue = useRecoilValue(themeState);
    const theme = getTheme(undefined, themeStateValue);

    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    if (code) {
        return <Loader />;
    }

    return (
        <LangContext.Provider value={langStateValue}>
            <ThemeProvider theme={theme}>
                <Global
                    styles={rcss`
                    body {
                        color: ${theme.colours.darkGray};
                        background-color: ${theme.colours.white};
                        min-width: ${isParallel ? '380px' : 'auto'};
                    }
                `}
                />
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
                        <Route exact path="/hymns/:hymnId">
                            <Hymn />
                        </Route>
                        <Route exact path="/hymns">
                            <Hymns />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/share/:versionData">
                            <AddSharedVersion />
                        </Route>
                        <Route path="/date/:date">
                            <DateRoutes />
                        </Route>
                    </Switch>
                </div>
            </ThemeProvider>
        </LangContext.Provider>
    );
};
