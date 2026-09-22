import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

export const Note = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const theme = useTheme();
    return (
        <div
            className={css`
                position: relative;
                background: ${theme.colours.bgGray};
                margin: 0 -12px 24px -12px;
                padding: 12px 12px 12px 12px;
                font-size: 13px;
                color: ${theme.colours.darkGray};
            `}
        >
            {children}
        </div>
    );
};
