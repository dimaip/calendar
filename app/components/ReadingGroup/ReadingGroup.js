import React from 'react';
import PropTypes from 'prop-types';
import { forEachObjIndexed } from 'ramda';
import ReadingItem from '../ReadingItem/ReadingItem.js';

import s from './ReadingGroup.scss';

const ReadingGroup = ({ title, readingVerses }) => {
    var items = readingVerses.map((el, i) => {
        return <ReadingItem reading={el} key={i} />;
    });

    return (
        <div className={s.root}>
            <em>{title}</em>
            {items}
        </div>
    );
};
ReadingGroup.propTypes = {
    title: PropTypes.string.isRequired,
    readingVerses: PropTypes.array.isRequired,
};

export default ReadingGroup;
