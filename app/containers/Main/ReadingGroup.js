import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import ReadingItem from './ReadingItem';
import { useTheme } from 'emotion-theming';

const ReadingGroup = ({ title, readingVerses }) => {
    var items = readingVerses
        .map(reading => {
            return reading && <ReadingItem reading={reading} key={reading} />;
        })
        .filter(Boolean);

    const theme = useTheme();

    return (
        <div
            className={css`
                margin-top: 8px;
            `}
        >
            {title !== 'unnamed' && (
                <div
                    className={css`
                        font-size: 16px;
                        color: ${theme.colours.gray};
                        line-height: 1.5;
                    `}
                >
                    {title}
                </div>
            )}
            {items}
        </div>
    );
};
ReadingGroup.propTypes = {
    title: PropTypes.string.isRequired,
    readingVerses: PropTypes.array.isRequired,
};

export default ReadingGroup;
