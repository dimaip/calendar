import React, { useState } from 'react';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import dateFormat from 'dateformat';
import 'moment/locale/ru';
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

const Main = () => {
    const { date } = useParams();
    const day = useDay(date);
    const { sermons, thisDays } = useExternalDay(date) || {};
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
                setNewDate(dateFormat(moment(date).subtract(1, 'days'), 'yyyy-mm-dd'));
                break;
            case 'right':
                setNewDate(dateFormat(moment(date).add(1, 'days'), 'yyyy-mm-dd'));
                break;
        }
        setDirection(direction);
    };
    const handleToggleClick = () => setCalendarShown(!calendarShown);

    const theme = getTheme(day?.colour);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header handleToggleClick={handleToggleClick} calendarShown={calendarShown} />
                <div>
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
                                                <SectionHeading>Богослужебные чтения</SectionHeading>
                                                <ReadingList readings={day.readings || {}} />

                                                <SectionHeading>Святые дня</SectionHeading>
                                                <Saints saints={day.saints} date={date} />
                                                <ThisDays thisDays={thisDays} />
                                                {day.prayers && day.prayers.length > 0 && (
                                                    <>
                                                        <SectionHeading>Песнопения</SectionHeading>
                                                        <Hymns hymns={day.prayers} />
                                                    </>
                                                )}
                                                {day.bReadings && day.bReadings.length > 0 && (
                                                    <>
                                                        <SectionHeading>Душеполезные чтения</SectionHeading>
                                                        <ReadingList brother readings={day.bReadings} />
                                                    </>
                                                )}
                                                <Sermons date={date} sermons={sermons} />
                                            </div>
                                        </Zoom>
                                    </div>
                                ) : (
                                    <Loader />
                                )}
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                <Links />
                <BottomNav active="calendar" />
            </div>
        </ThemeProvider>
    );
};
export default Main;
