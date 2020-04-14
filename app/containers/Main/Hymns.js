import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const Hymns = ({ hymns }) => {
    const theme = useTheme();
    return (
        <div
            dangerouslySetInnerHTML={{ __html: hymns }}
            className={css`
                font-size: 18px;
                line-height: 1.5;
                color: ${theme.colours.darkGray};
                margin-top: -24px;
                margin-bottom: 24px;

                & p {
                    margin-bottom: 12px;
                }

                & h5 {
                    font-weight: bold;
                    margin-top: 24px;
                    margin-bottom: 12px;
                }

                & a {
                    color: ${theme.colours.primary};
                }

                & img {
                    margin-right: 8px;
                }
                & audio {
                    display: block;
                }
            `}
        />
    );
};
export default Hymns;
