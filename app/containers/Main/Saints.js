import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const Saints = ({ saints }) => {
    const theme = useTheme();
    return (
        <div
            dangerouslySetInnerHTML={{ __html: saints }}
            className={css`
                font-size: 18px;
                line-height: 1.5;
                color: ${theme.colours.darkGray};

                & a {
                    color: ${theme.colours.primary};
                }

                & img {
                    margin-right: 8px;
                }
            `}
        />
    );
};
export default Saints;
