import React, { useState, useRef, useCallback } from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { useParams, useHistory } from 'react-router-dom';
import ReadingList from './ReadingList';
import HeaderMain from 'containers/Main/HeaderMain';
import Nav from 'components/Nav/Nav';
import HeadingBar from './HeadingBar';
import Loader from 'components/Loader/Loader';
import getTheme from 'styles/getTheme';
import useDay from 'hooks/useDay';
import BottomNav from 'components/BottomNav/BottomNav';
import Saints from './Saints';
import SectionHeading from './SectionHeading';
import Links from './Links';
import Zoom from 'components/Zoom/Zoom';
import SolidSection from 'components/SolidSection/SolidSection';
import Sermons from './Sermons';
import ThisDays from './ThisDays';
import useExternalDay from 'hooks/useExternalDay';
import Services from './Services';
import { parseISO, formatISO, subDays, addDays } from 'date-fns';
import useReadings from 'hooks/useReadings';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import BurgerMenu from './BurgerMenu';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import IosPrompt from './IosPrompt';
import LanguageSwitcher from 'containers/Service/LanguageSwitcher';
import Parts from 'components/Parts/Parts';
import BorderedSection from './BorderedSection';
import { HeightUpdater } from 'components/HeightUpdate/HeightUpdater';
import Banner from './Banner';
import { useRecoilValue } from 'recoil';
import themeState from 'state/themeState';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const SwipeableContainer = React.memo(({ date, handleToggleClick, makeHandleClickShift, services }) => {
    const dayQuery = useDay(date);
    const day = dayQuery.data;
    const externalDayQuery = useExternalDay(date);
    const { sermons, thisDays } = externalDayQuery.data || {};
    const themeStateValue = useRecoilValue(themeState);

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
                                                        <ReadingList readings={day.readings || {}} />

                                                        <BorderedSection>
                                                            <SectionHeading>Святые дня</SectionHeading>
                                                            <Saints saints={day.saints} date={date} />
                                                        </BorderedSection>

                                                        <ThisDays thisDays={thisDays} date={date} />

                                                        <BorderedSection>
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
                                                            <Parts
                                                                date={date}
                                                                partNames={[
                                                                    'shared.Тропари',
                                                                    'shared.Кондаки',
                                                                    'shared.Величания',
                                                                ]}
                                                            />
                                                        </BorderedSection>

                                                        {day.bReadings && Object.keys(day.bReadings).length > 0 && (
                                                            <>
                                                                <SectionHeading
                                                                    className={css`
                                                                        padding-top: 0 !important;
                                                                    `}
                                                                >
                                                                    Душеполезные чтения
                                                                </SectionHeading>
                                                                <ReadingList brother readings={day.bReadings} />
                                                            </>
                                                        )}
                                                        <Sermons date={date} sermons={sermons} />
                                                    </>
                                                )}
                                                <Banner />
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
    const [menuShown, setMenuShown] = useState(false);

    const calendarRef = useRef();

    const history = useHistory();
    const setNewDate = dateString => {
        history.push(`/date/${dateString}${services ? '/services' : ''}`);
    };
    const makeHandleClickShift = useCallback(
        direction => () => {
            switch (direction) {
                case 'left':
                    setNewDate(formatISO(subDays(parseISO(date), 1), { representation: 'date' }));
                    break;
                case 'right':
                    setNewDate(formatISO(addDays(parseISO(date), 1), { representation: 'date' }));
                    break;
            }
        },
        [date]
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
            <HeaderMain
                calendarRef={calendarRef}
                menuShown={menuShown}
                setMenuShown={setMenuShown}
                setNewDate={setNewDate}
                date={date}
            />
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                <VirtualizeSwipeableViews
                    index={activeIndex}
                    slideRenderer={slideRenderer}
                    overscanSlideAfter={1}
                    overscanSlideBefore={1}
                    animateHeight
                    onChangeIndex={onChangeIndex}
                />
            </div>

            <BurgerMenu menuShown={menuShown} setMenuShown={setMenuShown} />
            <BottomNav active={services ? 'services' : 'calendar'} />
            <IosPrompt />
        </div>
    );
});

export default Main;
