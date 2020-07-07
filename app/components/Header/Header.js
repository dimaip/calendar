import React from 'react';
import { css } from 'emotion';

const Header = ({ children }) => {
    return (
        <div
            className={css`
                height: 44px;
                user-select: none;
            `}
        >
            <header
                className={css`
                    position: fixed;
                    z-index: 4;
                    left: 0;
                    right: 0;
                    background-color: white;
                    display: flex;
                    height: 44px;
                    flex-shrink: 0;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                `}
            >
                {children}
            </header>
        </div>
    );
};
export default Header;
