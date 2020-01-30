import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import ReadingItem from './ReadingItem';
import { useTheme } from 'emotion-theming';

const ReadingGroup = ({ title, readingVerses }) => {
    var items = readingVerses.map((el, i) => {
        return <ReadingItem reading={el} key={i} />;
    });

    const theme = useTheme();

    return (
        <div
            className={css`
                margin-top: 8px;
            `}
        >
            <div
                className={css`
                    font-size: 16px;
                    color: ${theme.colours.gray};
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
