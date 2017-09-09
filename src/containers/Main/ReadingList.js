import React from 'react';
import PropTypes from 'prop-types';
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
  readings: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired
};

export default ReadingList;
