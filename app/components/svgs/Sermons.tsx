import React from 'react';
import { useTheme } from 'emotion-theming';

export default ({ colour }: { colour?: string }): JSX.Element => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="none">
            <path
                fill={colour || theme.colours.darkGray}
                d="M14.305 3.477c.8 0 1.452.65 1.452 1.447 0 .798-.652 1.447-1.452 1.447h-.727V3.477h.727Zm9.866 4.87-1.453-2.506-9.14 5.258V9.264h.727c2.402 0 4.356-1.947 4.356-4.34S16.707.584 14.304.584h-3.63v10.515L1.534 5.84.082 8.347l9.14 5.258-9.14 5.257 1.452 2.506 9.14-5.258v10.515h2.904V16.11l9.14 5.258 1.453-2.506-9.14-5.257 9.14-5.258Z"
            />
        </svg>
    );
};
