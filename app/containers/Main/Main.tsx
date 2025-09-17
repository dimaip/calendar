import React, { useState, useRef, useCallback, Suspense } from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { useParams, useHistory } from 'react-router-dom';
import HeaderMain from 'containers/Main/HeaderMain';
import Nav from 'components/Nav/Nav';
import Loader from 'components/Loader/Loader';
import getTheme from 'styles/getTheme';
import useDay from 'hooks/useDay';
import BottomNav from 'components/BottomNav/BottomNav';
import Zoom from 'components/Zoom/Zoom';
import SolidSection from 'components/SolidSection/SolidSection';
import useExternalDay from 'hooks/useExternalDay';
import { parseISO, formatISO, subDays, addDays } from 'date-fns';
import useReadings from 'hooks/useReadings';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import LanguageSwitcher from 'containers/Service/LanguageSwitcher';
import Parts from 'components/Parts/Parts';
import { HeightUpdater } from 'components/HeightUpdate/HeightUpdater';
import Troparions from 'containers/Service/Texts/Shared/Troparions/Troparions';
import MDXProvider from 'containers/Service/MDXProvider';
import Kondacs from 'containers/Service/Texts/Shared/Kondacs/Kondacs';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import { useRecoilValue } from 'recoil';
import themeState from 'state/themeState';

import BorderedSection from './BorderedSection';
import IosPrompt from './IosPrompt';
import Services from './Services';
import ThisDays from './ThisDays';
import Sermons from './Sermons';
import Links from './Links';
import SectionHeading from './SectionHeading';
import Saints from './Saints';
import HeadingBar from './HeadingBar';
import ReadingList from './ReadingList';
import Banner from './Banner';
// import EasterService from './EasterService';
import Peace from './Peace';
import Books from './Books';
import { TroparionFavsHome } from './TroparionFavsHome';
import Sing from './Sing';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const SwipeableContainer = React.memo(({ date, handleToggleClick, makeHandleClickShift, services }) => {
    const dayQuery = useDay(date);
    const day = dayQuery.data;
    const externalDayQuery = useExternalDay(date);
    const { sermons, thisDays } = externalDayQuery.data || {};
    const themeStateValue = useRecoilValue(themeState);

    const banners = [Sing, Peace, Books];
    const TodaysBanner = banners[new Date(date).getDate() % banners.length];

    const themeColour = useRef();
    if (day) {
        themeColour.current = day.colour;
    }

    const theme = getTheme(themeColour.current, themeStateValue);
    return (
        <HeightUpdater>
            <ThemeProvider theme={theme}>
                <div>
                    <Nav date={date} handleToggleClick={handleToggleClick} handleClickShift={makeHandleClickShift} />
                    <div>
                        {dayQuery.status === 'loading' && <Loader />}
                        {dayQuery.status === 'error' && <ErrorMessage500 />}
                        {dayQuery.status === 'success' && (
                            <div>
                                <HeadingBar
                                    title={day.title}
                                    glas={day.glas}
                                    fastName={day.fastName}
                                    fastingLevelName={day.fastingLevelName}
                                    icon={day.icon}
                                />
                                <div>
                                    <Zoom>
                                        <div
                                            className={css`
                                                padding: 0 18px;
                                            `}
                                        >
                                            <SolidSection>
                                                {services ? (
                                                    <Services date={date} readings={day.readings || {}} />
                                                ) : (
                                                    <>
                                                        <SectionHeading>Богослужебные чтения</SectionHeading>
                                                        <ReadingList readings={day.readings || {}} date={date} />

                                                        <div style={{ marginTop: -18 }}>
                                                            <SectionHeading>Святые дня</SectionHeading>
                                                            <Saints saints={day.saints} date={date} />
                                                        </div>
                                                        <ThisDays thisDays={thisDays} date={date} />
                                                        {/* <div style={{ marginBottom: 18 }}>
                                                            <EasterService />
                                                        </div> */}
                                                        <div style={{ margin: '0 -10px 0 -10px' }}>
                                                            <TodaysBanner />
                                                        </div>

                                                        <div>
                                                            <div
                                                                className={css`
                                                                    overflow: auto;
                                                                    display: flex;
                                                                    justify-content: space-between;
                                                                    align-items: center;
                                                                `}
                                                            >
                                                                <SectionHeading>Песнопения</SectionHeading>
                                                                <div>
                                                                    <LanguageSwitcher />
                                                                </div>
                                                            </div>
                                                            <MDXProvider>
                                                                <div
                                                                    className={`mainHymns ${css`
                                                                        margin-top: -16px;
                                                                    `}`}
                                                                >
                                                                    <Suspense fallback={<Loader />}>
                                                                        <Troparions
                                                                            date={date}
                                                                            day={day}
                                                                            isMain
                                                                            serviceType="Главная"
                                                                        />
                                                                        <Kondacs
                                                                            date={date}
                                                                            day={day}
                                                                            isMain
                                                                            serviceType="Главная"
                                                                        />
                                                                        <Parts
                                                                            date={date}
                                                                            partNames={['shared.Величания']}
                                                                        />
                                                                    </Suspense>
                                                                </div>
                                                            </MDXProvider>
                                                        </div>
                                                        <TroparionFavsHome />

                                                        {day.bReadings && Object.keys(day.bReadings).length > 0 && (
                                                            <>
                                                                <SectionHeading>Душеполезные чтения</SectionHeading>
                                                                <ReadingList
                                                                    date={date}
                                                                    brother
                                                                    readings={day.bReadings}
                                                                />
                                                            </>
                                                        )}
                                                        <Sermons date={date} sermons={sermons} />
                                                    </>
                                                )}
                                                <div style={{ marginBottom: 8 }}>
                                                    <Banner />
                                                </div>
                                            </SolidSection>
                                        </div>
                                    </Zoom>

                                    {!services && <Links />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ThemeProvider>
        </HeightUpdater>
    );
});

const Main = React.memo(({ services = false }) => {
    const { date } = useParams();
    // pre-fetch readings
    useReadings(date);

    const calendarRef = useRef();

    useDocumentTitle(`${date} - Православное богослужение на русском языке`);

    const history = useHistory();
    const setNewDate = (dateString) => {
        history.push(`/date/${dateString}${services ? '/services' : ''}`);
    };
    const makeHandleClickShift = useCallback(
        (direction) => () => {
            switch (direction) {
                case 'left':
                    setNewDate(formatISO(subDays(parseISO(date), 1), { representation: 'date' }));
                    break;
                case 'right':
                    setNewDate(formatISO(addDays(parseISO(date), 1), { representation: 'date' }));
                    break;
            }
        },
        [date, services]
    );
    const handleToggleClick = useCallback(() => {
        calendarRef?.current?.toggleCalendarShown(true);
    }, []);

    const goLeft = makeHandleClickShift('left');
    const goRight = makeHandleClickShift('right');

    const [activeIndex, setActiveIndex] = useState(0);

    const slideRenderer = useCallback(
        ({ key, index }) => {
            const indexOffset = index - activeIndex;
            const effectiveDate = formatISO(addDays(parseISO(date), indexOffset), { representation: 'date' });
            return (
                <SwipeableContainer
                    key={key}
                    date={effectiveDate}
                    services={services}
                    handleToggleClick={handleToggleClick}
                    makeHandleClickShift={makeHandleClickShift}
                />
            );
        },
        [date, services, handleToggleClick, activeIndex]
    );
    const onChangeIndex = useCallback(
        (index, indexLatest) => {
            if (index < indexLatest) {
                setActiveIndex(index);
                goLeft();
            } else {
                setActiveIndex(index);
                goRight();
            }
        },
        [goLeft, goRight]
    );

    return (
        <div>
            <HeaderMain calendarRef={calendarRef} setNewDate={setNewDate} date={date} />
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                {services ? (
                    slideRenderer({ key: 'services', index: 0 })
                ) : (
                    <VirtualizeSwipeableViews
                        index={activeIndex}
                        slideRenderer={slideRenderer}
                        overscanSlideAfter={1}
                        overscanSlideBefore={1}
                        animateHeight
                        onChangeIndex={onChangeIndex}
                    />
                )}
            </div>

            <BottomNav active={services ? 'services' : 'calendar'} />
            <IosPrompt />
        </div>
    );
});

export default Main;
