import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { forEachObjIndexed } from 'ramda';
import ReadingGroup from '../ReadingGroup/ReadingGroup.js';
import s from './ReadingsForService.scss';
import theme from '../../styles/theme';

const ReadingsForService = ({ title, readingsForService }) => {
    const rendredReadingGroups = [];
    forEachObjIndexed((value, key) => {
        rendredReadingGroups.push(<ReadingGroup title={String(key)} readingVerses={value} key={String(key)} />);
    }, readingsForService);

    return (
        <div
            className={css`
                border: 1px solid #d9dde5;
                border-radius: 3px;
                margin-bottom: 18px;
                padding: 12px 12px 0 12px;
            `}
        >
            <h2
                className={css`
                    text-transform: uppercase;
                    font-size: 12px;
                    font-weight: bold;
                    color: ${theme.colors.gray};
                    margin-bottom: 12px;
                `}
            >
                {title}
            </h2>
            {rendredReadingGroups}
        </div>
    );
};
ReadingsForService.propTypes = {
    title: PropTypes.string.isRequired,
    readingsForService: PropTypes.object.isRequired,
};

export default ReadingsForService;
