import React from 'react';
import ReadingsForService from 'containers/Main/ReadingsForService';

const ReadingList = ({readings}) => {
  const renderedReadings = Object.keys(readings).map(key => {
    return <ReadingsForService title={key} readingsForService={readings[key]} key={key} />;
  });
  return (
    <div>{renderedReadings}</div>
  );
};
ReadingList.propTypes = {
  readings: React.PropTypes.object.isRequired
};

export default ReadingList;
