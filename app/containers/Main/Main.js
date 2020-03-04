import React, { useState, Children } from 'react';
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
import Hymns from './Hymns';
import Sermons from './Sermons';
import ThisDays from './ThisDays';
import useExternalDay from 'hooks/useExternalDay';
import Services from './Services';
import { parseISO, formatISO, subDays, addDays } from 'date-fns';
import useReadings from 'hooks/useReadings';

const GradientSection = ({ children }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                background: linear-gradient(180deg, rgba(255, 255, 255, 0) calc(100% - 200px), #f2f2f6 100%);
                margin: 0 -18px;
                padding: 0 18px 1px 18px;
            `}
        >
            {children}
        </div>
    );
};
const SolidSection = ({ children }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                background: linear-gradient(180deg, #fafafc calc(100% - 200px), #f7f7f9 100%);
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
    const { data: day } = useDay(date);
    const { data: externalDay } = useExternalDay(date);

    // pre-fetch readings
    useReadings(date);

    const { sermons, thisDays } = externalDay || {};
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

    const theme = getTheme(day?.colour);

    return (
        <ThemeProvider theme={theme}>
            <div
                className={css`
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                `}
            >
                <Header handleToggleClick={handleToggleClick} calendarShown={calendarShown} />
                <div
                    className={css`
                        flex-grow: 1;
                        overflow-y: auto;
                    `}
                >
                    {calendarShown && <Calendar date={date} handleDayClick={handleDayClick} />}
                    <Nav date={date} handleToggleClick={handleToggleClick} handleClickShift={makeHandleClickShift} />
                    <div>
                        <ReactCSSTransitionGroup
                            className="slide-transition-group"
                            transitionName={`slide-${direction}`}
                            transitionEnterTimeout={400}
                            transitionLeaveTimeout={400}
                        >
                            <div className="slide" key={date}>
                                {Boolean(day) ? (
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
                                                        <GradientSection>
                                                            <SectionHeading>Богослужебные чтения</SectionHeading>
                                                            <ReadingList readings={day.readings || {}} />
                                                        </GradientSection>

                                                        <SectionHeading>Святые дня</SectionHeading>
                                                        <Saints saints={day.saints} date={date} />
                                                        <ThisDays thisDays={thisDays} date={date} />
                                                        {day.prayers && day.prayers.length > 0 && (
                                                            <SolidSection>
                                                                <div
                                                                    className={css`
                                                                        overflow: auto;
                                                                    `}
                                                                >
                                                                    <SectionHeading>Песнопения</SectionHeading>
                                                                </div>
                                                                <Hymns hymns={day.prayers} />
                                                            </SolidSection>
                                                        )}
                                                        {day.bReadings && Object.keys(day.bReadings).length > 0 && (
                                                            <GradientSection>
                                                                <SectionHeading>Душеполезные чтения</SectionHeading>
                                                                <ReadingList brother readings={day.bReadings} />
                                                            </GradientSection>
                                                        )}
                                                        <GradientSection>
                                                            <Sermons date={date} sermons={sermons} />
                                                        </GradientSection>
                                                    </>
                                                )}
                                            </div>
                                        </Zoom>
                                        <Links />
                                        <button onClick={methodDoesNotExist}>Сломай меня</button>;
                                    </div>
                                ) : (
                                    <Loader />
                                )}
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>

                <BottomNav active={services ? 'services' : 'calendar'} />
            </div>
        </ThemeProvider>
    );
};
export default Main;
