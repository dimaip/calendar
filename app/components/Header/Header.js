import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const Header = ({ children }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                height: 50px;
                height: calc(50px + env(safe-area-inset-top));
                user-select: none;
            `}
        >
            <header
                className={css`
                    padding-left: env(safe-area-inset-left);
                    padding-right: env(safe-area-inset-right);
                    padding-top: env(safe-area-inset-top);
                    height: 50px;
                    height: calc(50px + env(safe-area-inset-top));

                    position: fixed;
                    z-index: 4;
                    left: 0;
                    right: 0;
                    background-color: ${theme.colours.bgGrayLight};
                    display: flex;
                    flex-shrink: 0;
                    align-items: center;
                    border-bottom: 1px solid ${theme.colours.lineGray};
                `}
            >
                {children}
            </header>
        </div>
    );
};
export default Header;
