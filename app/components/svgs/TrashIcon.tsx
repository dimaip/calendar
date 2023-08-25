import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

export default () => {
    const theme = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -256 1792 1792"
            width="24"
            height="24"
            className={css`
                fill: ${theme.colours.primary};
            `}
        >
            <path
                d="M512 800V224q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v576q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0V224q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v576q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0V224q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v576q0 14 9 23t23 9h64q14 0 23-9t9-23zm128-724v948H256V76q0-22 7-40.5t14.5-27Q285 0 288 0h832q3 0 10.5 8.5t14.5 27q7 18.5 7 40.5zM480 1152h448l-48 117q-7 9-17 11H546q-10-2-17-11zm928-32v-64q0-14-9-23t-23-9h-96V76q0-83-47-143.5T1120-128H288q-66 0-113 58.5T128 72v952H32q-14 0-23 9t-9 23v64q0 14 9 23t23 9h309l70 167q15 37 54 63t79 26h320q40 0 79-26t54-63l70-167h309q14 0 23-9t9-23z"
                transform="matrix(1 0 0 -1 197.424 1255.05)"
            />
        </svg>
    );
};
