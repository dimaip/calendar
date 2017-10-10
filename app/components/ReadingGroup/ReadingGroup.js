import React from 'react';
import PropTypes from 'prop-types';
import { forEachObjIndexed } from 'ramda';

import s from './ReadingGroup.scss';

const ReadingGroup = ({ title, readingVerses }) => {

    //TODO dangerouslySetInnerHTML is bad
    return (
        <div className={s.root}>
            <em>{title} </em>
            <span dangerouslySetInnerHTML={{__html:readingVerses}}/>
        </div>
    );
};
ReadingGroup.propTypes = {
    title: PropTypes.string.isRequired,
    readingVerses: PropTypes.string.isRequired
};

export default ReadingGroup;
