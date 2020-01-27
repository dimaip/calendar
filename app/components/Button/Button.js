import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const Button = props => (
    <button
        {...props}
        className={css`
            ${props.className}
            cursor: pointer;
            padding: 12px;
            &:hover {
                opacity: 0.8;
            }
        `}
    >
        {props.children}
    </button>
);
Button.propTypes = {
    children: PropTypes.object,
};

export default Button;
