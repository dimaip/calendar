import React from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash.foreach';
import { css } from 'emotion';

import ReadingsForService from './ReadingsForService';

const ReadingList = ({ readings, brother = false }) => {
    const renderedReadings = [];

    forEach(readings, (value, key) => {
        renderedReadings.push(
            <ReadingsForService brother={brother} title={String(key)} readingsForService={value} key={String(key)} />
        );
    });

    return (
        <div
            className={css`
                margin: 0 -10px 18px -10px;
            `}
        >
            {renderedReadings}
        </div>
    );
};
ReadingList.propTypes = {
    readings: PropTypes.object.isRequired,
};

export default ReadingList;
