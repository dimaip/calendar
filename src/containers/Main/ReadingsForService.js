import React from 'react';
import {Link} from 'react-router';

const ReadingGroup = ({title, readingVerses}) => {
  console.log(readingVerses.toJS());
  const verses = readingVerses.map((value, key) => <div key={key}>{value.get('verse')}</div>).toArray();
  return (
    <div>
      <h3>{title}</h3>
      {verses}
    </div>
  );
};
ReadingGroup.propTypes = {
  title: React.PropTypes.string.isRequired,
  readingVerses: React.PropTypes.object.isRequired
};

const ReadingsForService = ({title, readingsForService, date}) => {
  const rendredReadingGroups = readingsForService.map((value, key) =>
    <ReadingGroup title={key} readingVerses={value} key={key} />
  ).toArray();
  return (
    <Link to={`/${date}/read/${title}`}>
      <h2>{title}</h2>
      {rendredReadingGroups}
    </Link>
  );
};
ReadingsForService.propTypes = {
  title: React.PropTypes.string.isRequired,
  readingsForService: React.PropTypes.object.isRequired,
  date: React.PropTypes.string.isRequired
};

export default ReadingsForService;
