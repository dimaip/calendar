import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { forEachObjIndexed } from 'ramda';
import ReadingGroup from '../ReadingGroup/ReadingGroup.js';
import s from './ReadingsForService.scss';

const ReadingsForService = ({ title, readingsForService, date }) => {
    const rendredReadingGroups = [];
    forEachObjIndexed((value, key) => {
        rendredReadingGroups.push(<ReadingGroup title={key} readingVerses={value} key={key} />);
    }, readingsForService);

    return (
        <div className={s.root}>
            {title != 'Основное' ? <h2 className={s.title}>{title}</h2> : null}
            {rendredReadingGroups}
        </div>
    );
};
ReadingsForService.propTypes = {
    title: PropTypes.string.isRequired,
    readingsForService: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
};

export default ReadingsForService;
