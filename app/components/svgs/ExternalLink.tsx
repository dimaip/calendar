import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const ExternalLink = () => {
    const theme = useTheme();
    return (
        <svg
            className={css`
                fill: ${theme.colours.primary};
            `}
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
        >
            <path d="M10.147,1.765a.882.882,0,1,1,0-1.765h3.971A.883.883,0,0,1,15,.882V4.853a.882.882,0,1,1-1.765,0V3.012L8.124,8.124A.882.882,0,0,1,6.876,6.876l5.111-5.111Zm3.088,6.618a.882.882,0,1,1,1.765,0v5.735a.883.883,0,0,1-.882.882H.882A.883.883,0,0,1,0,14.118V.882A.883.883,0,0,1,.882,0H6.618a.882.882,0,1,1,0,1.765H1.765v11.47h11.47Z" />
        </svg>
    );
};
export default ExternalLink;
