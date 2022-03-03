import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash.foreach';
import { css } from 'emotion';

import ReadingsForService from './ReadingsForService';
import Canon from './Canon';

const ReadingList = ({ readings, brother = false, date }) => {
    const renderedReadings = [];
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);

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
            {!brother && isEasterOffsetRange(-7 * 7 + 1, -7 * 7 + 4) && (
                <div style={{ marginTop: 8 }}>
                    <Canon />
                </div>
            )}
        </div>
    );
};
ReadingList.propTypes = {
    readings: PropTypes.object.isRequired,
};

export default ReadingList;
