import React from 'react';
import dateFormat from 'dateformat';
import moment from 'moment';
import CalendarIcon from 'react-icons/lib/fa/calendar.js';
import CircleLeftIcon from 'react-icons/lib/fa/arrow-circle-o-left.js';
import CircleRightIcon from 'react-icons/lib/fa/arrow-circle-o-right.js';
import Button from 'components/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Nav.scss';

const Nav = ({
  handlePrevDayClick,
  handleNextDayClick,
  handleToggleClick,
  date
}) => (
  <div className={s.root}>
    <button className={s.arrows} onClick={handlePrevDayClick} ><CircleLeftIcon /></button>
    <Button className={s.toggle} onClick={handleToggleClick} ><CalendarIcon /></Button>
    <div className={s.date}>
      <div className={s.dateNew}>{dateFormat(date, 'dddd,')}<br/>{dateFormat(date, 'dS mmmm yyyy')}</div>
      <div className={s.dateOld}>{dateFormat(moment(date).subtract(-13, 'days'), 'dS mmmm')} по старому стилю</div>
    </div>
    <button className={s.arrows} onClick={handleNextDayClick} ><CircleRightIcon/></button>
  </div>
);
Nav.propTypes = {
  handlePrevDayClick: React.PropTypes.func.isRequired,
  handleNextDayClick: React.PropTypes.func.isRequired,
  handleToggleClick: React.PropTypes.func.isRequired,
  date: React.PropTypes.string.isRequired
};

export default withStyles(Nav, s);
