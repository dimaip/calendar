import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const ReadingItem = ({ reading }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                font-size: 18px;
                color: ${theme.colours.darkGray};
                line-height: 1.5;
            `}
        >
            {reading}
        </div>
    );
};
ReadingItem.propTypes = {
    reading: PropTypes.string.isRequired,
};

export default ReadingItem;
