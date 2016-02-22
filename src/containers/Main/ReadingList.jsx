import React from 'react';
import ReadingsForService from 'containers/Main/ReadingsForService';

const ReadingList = ({readings, date}) => {
  const renderedReadings = readings.map((value, key) => {
    return <ReadingsForService title={key} readingsForService={value} key={key} date={date}/>;
  }).toArray();
  return (
    <div>{renderedReadings}</div>
  );
};
ReadingList.propTypes = {
  readings: React.PropTypes.object.isRequired,
  date: React.PropTypes.string.isRequired
};

export default ReadingList;
