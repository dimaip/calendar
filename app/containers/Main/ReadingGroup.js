import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import theme from '../../styles/theme';
import ReadingItem from './ReadingItem';

const ReadingGroup = ({ title, readingVerses }) => {
    var items = readingVerses.map((el, i) => {
        return <ReadingItem reading={el} key={i} />;
    });

    return (
        <div
            className={css`
                margin-bottom: 12px;
            `}
        >
            <em
                className={css`
                    font-size: 14px;
                    color: ${theme.colors.darkGray};
                    line-height: 1.5;
                `}
            >
                {title}
            </em>
            {items}
        </div>
    );
};
ReadingGroup.propTypes = {
    title: PropTypes.string.isRequired,
    readingVerses: PropTypes.array.isRequired,
};

export default ReadingGroup;
