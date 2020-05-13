import React, { useState, useRef, useEffect } from 'react';
import { css } from 'emotion';
import { ThemeProvider, useTheme } from 'emotion-theming';
import { useParams, useHistory } from 'react-router-dom';
import dateFormat from 'dateformat';
import ReadingList from './ReadingList';
import Header from 'components/Header/Header';
import Nav from 'components/Nav/Nav';
import HeadingBar from './HeadingBar';
import Loader from 'components/Loader/Loader';
import getTheme from 'styles/theme';
import Calendar from './Calendar';
import useDay from 'hooks/useDay';
import BottomNav from 'components/BottomNav/BottomNav';
import Saints from './Saints';
import SectionHeading from './SectionHeading';
import Links from './Links';
import Zoom from 'components/Zoom/Zoom';
import SolidSection from 'components/SolidSection/SolidSection';
import Hymns from './Hymns';
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

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const BorderedSection = ({ children }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                border-bottom: 0.5px solid ${theme.colours.lineGray};
                margin: 0 -18px;
                padding: 0 18px 1px 18px;
            `}
        >
            {children}
        </div>
    );
};

const Inner = ({ date, services, handleToggleClick, makeHandleClickShift }) => {
    const dayQuery = useDay(date);
    const day = dayQuery.data;
    const externalDayQuery = useExternalDay(date);
    const { sermons, thisDays } = externalDayQuery.data || {};

    const themeColour = useRef();
    if (day) {
        themeColour.current = day.colour;
    }

    const theme = getTheme(themeColour.current);
    return (
        <ThemeProvider theme={theme}>
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
                        <Zoom>
                            <div
                                className={css`
                                    padding: 0 18px;
                                `}
                            >
                                {services ? (
                                    <Services date={date} readings={day.readings || {}} />
                                ) : (
                                    <>
                                        <SolidSection>
                                            <SectionHeading>Богослужебные чтения</SectionHeading>
                                            <ReadingList readings={day.readings || {}} />
                                        </SolidSection>

                                        <SectionHeading>Святые дня</SectionHeading>
                                        <Saints saints={day.saints} date={date} />

                                        <ThisDays thisDays={thisDays} date={date} />
                                        {(day.prayers || day.prayersOther) && (
                                            <BorderedSection>
                                                <div
                                                    className={css`
                                                        overflow: auto;
                                                    `}
                                                >
                                                    <SectionHeading>Песнопения</SectionHeading>
                                                </div>
                                                <Hymns hymns={(day.prayers || '') + (day.prayersOther || '')} />
                                            </BorderedSection>
                                        )}
                                        {day.bReadings && Object.keys(day.bReadings).length > 0 && (
                                            <SolidSection>
                                                <SectionHeading>Душеполезные чтения</SectionHeading>
                                                <ReadingList brother readings={day.bReadings} />
                                            </SolidSection>
                                        )}
                                        <SolidSection>
                                            <Sermons date={date} sermons={sermons} />
                                        </SolidSection>
                                    </>
                                )}
                            </div>
                        </Zoom>
                        {!services && <Links />}
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

const Main = ({ services = false }) => {
    const { date } = useParams();
    // pre-fetch readings
    useReadings(date);
    const [calendarShown, setCalendarShown] = useState(false);
    const [menuShown, setMenuShown] = useState(false);

    const history = useHistory();
    const setNewDate = dateString => {
        history.push(`/date/${dateString}${services ? '/services' : ''}`);
    };
    const handleDayClick = day => {
        const dateString = dateFormat(day, 'yyyy-mm-dd');
        setNewDate(dateString);
        setCalendarShown(false);
    };
    const makeHandleClickShift = direction => () => {
        switch (direction) {
            case 'left':
                setNewDate(formatISO(subDays(parseISO(date), 1), { representation: 'date' }));
                break;
            case 'right':
                setNewDate(formatISO(addDays(parseISO(date), 1), { representation: 'date' }));
                break;
        }
    };
    const handleToggleClick = () => setCalendarShown(!calendarShown);

    const theme = getTheme();

    const goLeft = makeHandleClickShift('left');
    const goRight = makeHandleClickShift('right');

    const [activeIndex, setActiveIndex] = useState(0);

    const slideRenderer = ({ key, index }) => {
        const indexOffset = index - activeIndex;
        const effectiveDate = formatISO(addDays(parseISO(date), indexOffset), { representation: 'date' });
        return (
            <Inner
                key={key}
                date={effectiveDate}
                services={services}
                handleToggleClick={handleToggleClick}
                makeHandleClickShift={makeHandleClickShift}
            />
        );
    };
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header
                    handleToggleClick={handleToggleClick}
                    calendarShown={calendarShown}
                    menuShown={menuShown}
                    setMenuShown={setMenuShown}
                />
                <div
                    className={css`
                        flex-grow: 1;
                    `}
                >
                    {calendarShown && (
                        <Calendar date={date} handleDayClick={handleDayClick} onClose={() => setCalendarShown(false)} />
                    )}

                    <VirtualizeSwipeableViews
                        index={activeIndex}
                        slideRenderer={slideRenderer}
                        overscanSlideAfter={1}
                        overscanSlideBefore={1}
                        onChangeIndex={(index, indexLatest) => {
                            if (index < indexLatest) {
                                setActiveIndex(index);
                                goLeft();
                            } else {
                                setActiveIndex(index);
                                goRight();
                            }
                        }}
                    />
                </div>

                <BurgerMenu menuShown={menuShown} setMenuShown={setMenuShown} />
                <BottomNav active={services ? 'services' : 'calendar'} />
                <IosPrompt />
            </div>
        </ThemeProvider>
    );
};

export default Main;
