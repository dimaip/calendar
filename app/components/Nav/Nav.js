import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import moment from 'moment';
import 'moment/locale/ru';
import CalendarIcon from 'react-icons/lib/fa/calendar.js';
import CircleLeftIcon from 'react-icons/lib/fa/arrow-circle-o-left.js';
import CircleRightIcon from 'react-icons/lib/fa/arrow-circle-o-right.js';
import Button from '../Button/Button.js';
import s from './Nav.scss';

const Nav = ({
    handleToggleClick,
    handleClickShift,
    date
}) => {
    return (
        <div className={s.root}>
            <Button className={s.arrows} onClick={handleClickShift('left')}><CircleLeftIcon /></Button>
            <Button className={s.toggle} onClick={handleToggleClick}><CalendarIcon /></Button>
            <div className={s.date}>
                <div className={s.dateNew}>{dateFormat(date, 'dddd,')}<br />{dateFormat(date, 'dS mmmm yyyy')}</div>
                <div className={s.dateOld}>{dateFormat(moment(date).subtract(-13, 'days'), 'dS mmmm')} по старому стилю</div>
            </div>
            <Button className={s.arrows} onClick={handleClickShift('right')}><CircleRightIcon /></Button>
        </div>
    );
};
Nav.propTypes = {
    handleToggleClick: PropTypes.func.isRequired,
    handleClickShift: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired
};

export default Nav;
