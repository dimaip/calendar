import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import ReadingGroup from './ReadingGroup';
import s from './ReadingsForService.scss';

const ReadingsForService = ({title, readingsForService, date}) => {
  const rendredReadingGroups = readingsForService.map((value, key) =>
    <ReadingGroup title={key} readingVerses={value} key={key} />
  ).toArray();
  return (
    <Link className={s.root} to={`/${date}/read/${title}`}>
      <h2 className={s.title}>{title}</h2>
      {rendredReadingGroups}
    </Link>
  );
};
ReadingsForService.propTypes = {
  title: PropTypes.string.isRequired,
  readingsForService: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired
};

export default ReadingsForService;
