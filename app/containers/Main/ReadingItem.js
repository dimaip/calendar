import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import theme from '../../styles/theme';

const ReadingItem = ({ reading }) => (
    <div
        className={css`
            font-size: 16px;
            color: ${theme.colors.darkGray};
            line-height: 1.5;
        `}
    >
        {reading}
    </div>
);
ReadingItem.propTypes = {
    reading: PropTypes.string.isRequired,
};

export default ReadingItem;
