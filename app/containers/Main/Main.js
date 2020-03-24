import React, { useState, useRef } from 'react';
import { css } from 'emotion';
import { ThemeProvider, useTheme } from 'emotion-theming';
import { useParams, useHistory } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

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

const Main = ({ services }) => {
    const { date } = useParams();
    const dayQuery = useDay(date);
    const day = dayQuery.data;
    const externalDayQuery = useExternalDay(date);
    const { sermons, thisDays } = externalDayQuery.data || {};

    // pre-fetch readings
    useReadings(date);

    const [calendarShown, setCalendarShown] = useState(false);
    const [direction, setDirection] = useState('mount');
    const history = useHistory();
    const setNewDate = dateString => {
        history.push(`/date/${dateString}`);
    };
    const handleDayClick = day => {
        const dateString = dateFormat(day, 'yyyy-mm-dd');
        const direction = dateString > date ? 'right' : 'left';

        setNewDate(dateString);
        setDirection(direction);
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
        setDirection(direction);
    };
    const handleToggleClick = () => setCalendarShown(!calendarShown);

    const themeColour = useRef();
    if (day?.colour) {
        themeColour.current = day?.colour;
    }

    const theme = getTheme(themeColour.current);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header handleToggleClick={handleToggleClick} calendarShown={calendarShown} />
                <div
                    className={css`
                        flex-grow: 1;
                    `}
                >
                    {calendarShown && (
                        <Calendar date={date} handleDayClick={handleDayClick} onClose={() => setCalendarShown(false)} />
                    )}
                    <Nav date={date} handleToggleClick={handleToggleClick} handleClickShift={makeHandleClickShift} />
                    <div>
                        {dayQuery.status === 'loading' && <Loader />}
                        {dayQuery.status === 'error' && <ErrorMessage />}
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
                                            <Services date={date} />
                                        ) : (
                                            <>
                                                <SolidSection>
                                                    <SectionHeading>Богослужения</SectionHeading>
                                                    <ReadingList readings={day.readings || {}} />
                                                </SolidSection>

                                                <BorderedSection>
                                                    <SectionHeading>Святые дня</SectionHeading>
                                                    <Saints saints={day.saints} date={date} />
                                                </BorderedSection>

                                                <ThisDays thisDays={thisDays} date={date} />
                                                {day.prayers && day.prayers.length > 0 && (
                                                    <BorderedSection>
                                                        <div
                                                            className={css`
                                                                overflow: auto;
                                                            `}
                                                        >
                                                            <SectionHeading>Песнопения</SectionHeading>
                                                        </div>
                                                        <Hymns hymns={day.prayers} />
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
                </div>

                <BottomNav active={services ? 'services' : 'calendar'} />
            </div>
        </ThemeProvider>
    );
};
export default Main;
