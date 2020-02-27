import React from 'react';
import PropTypes from 'prop-types';
import ReadingsForService from './ReadingsForService';
import forEach from 'lodash.foreach';

const ReadingList = ({ readings, brother = false }) => {
    const renderedReadings = [];

    forEach(readings, (value, key) => {
        renderedReadings.push(
            <ReadingsForService brother={brother} title={String(key)} readingsForService={value} key={String(key)} />
        );
    });

    return <div>{renderedReadings}</div>;
};
ReadingList.propTypes = {
    readings: PropTypes.object.isRequired,
};

export default ReadingList;
