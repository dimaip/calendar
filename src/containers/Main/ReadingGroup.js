import React from 'react';
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
  title: React.PropTypes.string.isRequired,
  readingVerses: React.PropTypes.object.isRequired
};

export default ReadingGroup;
