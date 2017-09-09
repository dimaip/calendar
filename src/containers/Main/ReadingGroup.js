import React from 'react';
import PropTypes from 'prop-types';
import s from './ReadingGroup.scss';

const ReadingGroup = ({title, readingVerses}) => {
  const verses = readingVerses.map((value, key) => <span key={key}>{value.get('verse')} </span>).toArray();
  return (
    <div className={s.root}>
      <em>{title} </em>
      <span>{verses}</span>
    </div>
  );
};
ReadingGroup.propTypes = {
  title: PropTypes.string.isRequired,
  readingVerses: PropTypes.object.isRequired
};

export default ReadingGroup;
