import React from 'react';
import PropTypes from 'prop-types';
import { forEachObjIndexed } from 'ramda';
import ReadingsForService from '../ReadingsForService/ReadingsForService.js';

const ReadingList = ({ readings, date }) => {
    const renderedReadings = [];

    forEachObjIndexed((value, key) => {
        renderedReadings.push(<ReadingsForService title={key} readingsForService={value} key={key} date={date} />);
    }, readings);

    return <div>{renderedReadings}</div>;
};
ReadingList.propTypes = {
    readings: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
};

export default ReadingList;
