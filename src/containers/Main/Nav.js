import React from 'react';
import {Link} from 'react-router';
import dateFormat from 'dateformat';
import moment from 'moment';
import 'moment/locale/ru';
import CalendarIcon from 'react-icons/lib/fa/calendar.js';
import CircleLeftIcon from 'react-icons/lib/fa/arrow-circle-o-left.js';
import CircleRightIcon from 'react-icons/lib/fa/arrow-circle-o-right.js';
import Button from 'components/Button';
import s from './Nav.scss';

const Nav = ({
  handleToggleClick,
  date
}) => {
  const prevDay = dateFormat(moment(date).subtract(1, 'days'), 'yyyy-mm-dd');
  const nextDay = dateFormat(moment(date).add(1, 'days'), 'yyyy-mm-dd');
  return (
    <div className={s.root}>
      <Link className={s.arrows} to={`/${prevDay}`}><CircleLeftIcon /></Link>
      <Button className={s.toggle} onClick={handleToggleClick} ><CalendarIcon /></Button>
      <div className={s.date}>
        <div className={s.dateNew}>{dateFormat(date, 'dddd,')}<br/>{dateFormat(date, 'dS mmmm yyyy')}</div>
        <div className={s.dateOld}>{dateFormat(moment(date).subtract(-13, 'days'), 'dS mmmm')} по старому стилю</div>
      </div>
      <Link className={s.arrows} to={`/${nextDay}`}><CircleRightIcon /></Link>
    </div>
  );
};
Nav.propTypes = {
  handleToggleClick: React.PropTypes.func.isRequired,
  date: React.PropTypes.string.isRequired
};

export default Nav;
