import React, { Suspense, useEffect, useRef } from 'react';
import { Navigate, Route, Routes as RouterRoutes, useLocation, useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Global, ThemeProvider, css as rcss } from '@emotion/react';
import { css } from '@emotion/css';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { loadServiceRoute } from './routeLoaders';
import checkVersion from './checkVersion';

import Main from 'containers/Main/Main';
import NotFound from 'components/NotFound/NotFound';
import useDay from 'hooks/useDay';
import getTheme from 'styles/getTheme';
import langState from 'state/langState';
import { LangContext } from 'containers/Service/LangContext';
import pendingUpdateState from 'state/pendingUpdateState';
import UpdatePrompt from 'components/UpdatePrompt/UpdatePrompt';
import isParallelState from 'state/isParallel';
import { Promo } from 'components/Promo/Promo';
import Loader from 'components/Loader/Loader';
import themeState from 'state/themeState';
import menuShownState from 'state/menuShownState';

const Hymns = React.lazy(async () => {
    const module = await import(/* webpackChunkName: "route-hymns" */ 'containers/Hymns/Hymns');
    return { default: module.Hymns };
});
const Hymn = React.lazy(async () => {
    const module = await import(/* webpackChunkName: "route-hymns" */ 'containers/Hymns/Hymn');
    return { default: module.Hymn };
});
const Readings = React.lazy(
    async () => await import(/* webpackChunkName: "route-readings" */ 'containers/Readings/Readings')
);
const Sermon = React.lazy(
    async () => await import(/* webpackChunkName: "route-date-sermon" */ 'containers/Sermon/Sermon')
);
const Saint = React.lazy(async () => await import(/* webpackChunkName: "route-date-saint" */ 'containers/Saint/Saint'));
const ThisDay = React.lazy(
    async () => await import(/* webpackChunkName: "route-this-day" */ 'containers/ThisDay/ThisDay')
);
const Service = React.lazy(loadServiceRoute);
const SettingsMenu = React.lazy(
    async () => await import(/* webpackChunkName: "settings-menu" */ 'containers/Main/SettingsMenu')
);
const Profile = React.lazy(
    async () => await import(/* webpackChunkName: "route-profile" */ 'containers/Profile/Profile')
);
const AddSharedVersion = React.lazy(
    async () =>
        await import(/* webpackChunkName: "route-shared-version" */ 'containers/AddSharedVersion/AddSharedVersion')
);
const SermonListContainer = React.lazy(
    async () => await import(/* webpackChunkName: "route-sermons" */ 'containers/SermonList/SermonList')
);
const SermonDetail = React.lazy(
    async () => await import(/* webpackChunkName: "route-sermons" */ 'containers/SermonDetail/SermonDetail')
);
const Updates = React.lazy(
    async () => await import(/* webpackChunkName: "route-updates" */ 'containers/Updates/Updates')
);
const UpdatesAdmin = React.lazy(
    async () => await import(/* webpackChunkName: "route-updates-admin" */ 'containers/Updates/UpdatesAdmin')
);

const DateRoutes = () => {
    const { date = '' } = useParams<'date'>();
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
                <RouterRoutes>
                    <Route index element={<Main />} />
                    <Route path="services" element={<Main services />} />
                    <Route path="readings/:service" element={<Readings />} />
                    <Route path="bReadings/:service" element={<Readings brother />} />
                    <Route path="sermon/:sermonId" element={<Sermon />} />
                    <Route path="saint/:saintId" element={<Saint />} />
                    <Route path="thisday/:thisDayId" element={<ThisDay />} />
                    <Route path="service/:serviceId/:prayerId?" element={<Service />} />
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
                <UpdatePrompt />
                {/* <ScriptEditorPromo /> */}
            </Promo>
        </ThemeProvider>
    );
};

const Routes = () => {
    const langStateValue = useRecoilValue(langState);
    const location = useLocation();
    const previousLocationKey = useRef(location.key);
    const setPendingUpdate = useSetRecoilState(pendingUpdateState);

    useEffect(() => {
        if (previousLocationKey.current === location.key) {
            return undefined;
        }
        previousLocationKey.current = location.key;

        let active = true;
        void checkVersion().then((newVersion) => {
            if (active && newVersion) {
                setPendingUpdate(newVersion);
            }
        });

        return () => {
            active = false;
        };
    }, [location.key, setPendingUpdate]);
    const isParallel = useRecoilValue(isParallelState);
    const menuShown = useRecoilValue(menuShownState);
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
                    {menuShown && (
                        <Suspense fallback={null}>
                            <SettingsMenu />
                        </Suspense>
                    )}
                    <Suspense fallback={<Loader />}>
                        <RouterRoutes>
                            <Route
                                path="/"
                                element={<Navigate replace to={`/date/${dateFormat(new Date(), 'yyyy-mm-dd')}`} />}
                            />
                            <Route path="/hymns/:hymnId" element={<Hymn />} />
                            <Route path="/hymns" element={<Hymns />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/updates" element={<Updates />} />
                            <Route path="/admin/updates/new" element={<UpdatesAdmin />} />
                            <Route path="/admin/updates/:updateId" element={<UpdatesAdmin />} />
                            <Route path="/admin/updates" element={<UpdatesAdmin />} />
                            <Route path="/share/:versionData" element={<AddSharedVersion />} />
                            <Route path="/date/:date/*" element={<DateRoutes />} />
                            <Route path="/sermons" element={<SermonListContainer />} />
                            <Route path="/sermons/:authorId" element={<SermonListContainer />} />
                            <Route path="/sermon/:sermonId" element={<SermonDetail />} />
                        </RouterRoutes>
                    </Suspense>
                </div>
            </ThemeProvider>
        </LangContext.Provider>
    );
};

export default Routes;
