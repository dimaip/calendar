import React, { useState } from 'react';
import { css } from 'emotion';
import { useDispatch } from 'react-redux';
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
import theme from 'styles/theme';
import getDay from 'redux/actions/getDay';
import Calendar from './Calendar';
import getDayInfo from 'domain/getDayInfo';
import useDay from 'hooks/useDay';

const Heading = ({ children }) => (
    <h2
        className={css`
            font-size: 21px;
            line-height: 1;
            font-weight: bold;
            color: ${theme.colors.darkGray};
            margin-top: 24px;
            margin-bottom: 12px;
        `}
    >
        {children}
    </h2>
);

const Main = () => {
    const { date } = useParams();
    const day = useDay();
    const [calendarShown, setCalendarShown] = useState(false);
    const [direction, setDirection] = useState('mount');
    const history = useHistory();
    const dispatch = useDispatch();
    const setNewDate = dateString => {
        history.push(`/date/${dateString}`);
        dispatch(getDay(dateString));
    };
    const handleDayClick = day => {
        const dateString = dateFormat(day, 'yyyy-mm-dd');
        const direction = dateString > this.props.date ? 'right' : 'left';

        setNewDate(dateString);
        setDirection(direction);
        setCalendarShown(false);
    };
    const makeHandleClickShift = direction => () => {
        switch (direction) {
            case 'left':
                this.setNewDate(dateFormat(moment(date).subtract(1, 'days'), 'yyyy-mm-dd'));
                break;
            case 'right':
                this.setNewDate(dateFormat(moment(date).add(1, 'days'), 'yyyy-mm-dd'));
                break;
        }
        setDirection(direction);
    };
    const handleToggleClick = () => setCalendarShown(!calendarShown);
    const { colour } = getDayInfo(new Date(date));
    console.log(colour);

    return (
        <div>
            <Header handleToggleClick={handleToggleClick} calendarShown={calendarShown} />
            <div>
                {calendarShown && <Calendar date={date} handleDayClick={handleDayClick} />}
                <Nav date={date} handleToggleClick={handleToggleClick} handleClickShift={makeHandleClickShift} />
                <div className="slide-wrap">
                    <ReactCSSTransitionGroup
                        className="slide-transition-group"
                        transitionName={`slide-${direction}`}
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}
                    >
                        <div className="slide" key={date}>
                            {Boolean(day) ? (
                                <div>
                                    <HeadingBar title={day.title} glas={day.glas} lent={day.lent} />
                                    <div
                                        className={css`
                                            padding: 0 18px;
                                        `}
                                    >
                                        <Heading>Чтение дня</Heading>
                                        <ReadingList readings={day.readings || {}} />
                                        <Heading>Святые дня</Heading>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: day.saints }}
                                            className={css`
                                                font-size: 16px;
                                                line-height: 1.5;
                                                color: ${theme.colors.darkGray};

                                                & a {
                                                    color: ${theme.colors.primary};
                                                }

                                                & img {
                                                    margin-right: 12px;
                                                }
                                            `}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <Loader />
                            )}
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        </div>
    );
};
export default Main;
