import React from 'react';

const ReadingGroup = ({title, readingVerses}) => {
  const parsedVerses = readingVerses.replace(/<a href="(.*)">/g, '<a href="http://bible.psmb.ru/bible/book/$1">');
  return (
    <div>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{__html: parsedVerses}} />
    </div>
  );
};
ReadingGroup.propTypes = {
  title: React.PropTypes.string.isRequired,
  readingVerses: React.PropTypes.string.isRequired,
};

const ReadingsForService = ({title, readingsForService}) => {
  const rendredReadingGroups = Object.keys(readingsForService).map(key =>
    <ReadingGroup title={key} readingVerses={readingsForService[key]} key={key} />
  );
  return (
    <div>
      <h2>{title}</h2>
      {rendredReadingGroups}
    </div>
  );
};
ReadingsForService.propTypes = {
  title: React.PropTypes.string.isRequired,
  readingsForService: React.PropTypes.object.isRequired,
};

export default ReadingsForService;
