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
                margin-top: 8px;
            `}
        >
            <div
                className={css`
                    font-size: 14px;
                    color: ${theme.colors.gray};
                    line-height: 1.5;
                `}
            >
                {title}
            </div>
            {items}
        </div>
    );
};
ReadingGroup.propTypes = {
    title: PropTypes.string.isRequired,
    readingVerses: PropTypes.array.isRequired,
};

export default ReadingGroup;
