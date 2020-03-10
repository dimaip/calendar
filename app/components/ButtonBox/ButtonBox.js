import React from 'react';
import { css } from 'emotion';

const ButtonBox = props => (
    <div
        className={css`
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
            margin-bottom: 8px;
            padding: 14px 12px;
        `}
    >
        {props.children}
    </div>
);

export default ButtonBox;
