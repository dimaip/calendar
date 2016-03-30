import React from 'react';
import {Link} from 'react-router';
import dateFormat from 'dateformat';
import CircleLeftIcon from 'react-icons/lib/fa/arrow-circle-o-left.js';
import AngleRightIcon from 'react-icons/lib/fa/angle-right.js';
import s from './HeadingBar.scss';

const HeadingBar = ({date, service}) => (
  <div className={s.root}>
    <Link to={`/${date}`}>
      <CircleLeftIcon className={s.backIcon} /> {dateFormat(date, 'dd.mm.yyyy')}
    </Link>
    <AngleRightIcon className={s.separatorIcon} />
    <h2>{service}</h2>
  </div>
);
HeadingBar.propTypes = {
  date: React.PropTypes.string.isRequired,
  service: React.PropTypes.string.isRequired
};

export default HeadingBar;
