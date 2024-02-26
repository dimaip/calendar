import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

export default ({ size = 24, colour }: { size: number; colour: string }): JSX.Element => {
    const theme = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 55 69"
            className={css`
                fill: ${colour || theme.colours.primary};
            `}
        >
            <path
                d="m47 12.41-1.85 50.01c-.03.86-.79 1.59-1.65 1.59h-32c-.86 0-1.62-.73-1.65-1.59L8 12.41a2.503 2.503 0 0 0-5 .18L4.85 62.6c.13 3.54 3.1 6.4 6.65 6.4h32c3.55 0 6.51-2.85 6.65-6.4L52 12.59a2.503 2.503 0 0 0-5-.18Z"
                strokeWidth={0}
            />
            <path
                d="M25.5 22.5v34c0 1.1.9 2 2 2s2-.9 2-2v-34c0-1.1-.9-2-2-2s-2 .9-2 2Zm-11 .06 1 34a2 2 0 1 0 4-.12l-1-34a2 2 0 1 0-4 .12Zm22-.12-1 34c-.03 1.1.84 2.03 1.94 2.06 1.1.03 2.03-.84 2.06-1.94l1-34c.03-1.1-.84-2.03-1.94-2.06-1.1-.03-2.03.84-2.06 1.94Zm-34-8.94h50a2.5 2.5 0 0 0 0-5h-50a2.5 2.5 0 0 0 0 5Z"
                strokeWidth={0}
            />
            <path
                d="m19.9 10.19 1.04-3.64c.22-.78 1.23-1.54 2.05-1.54h9.02c.81 0 1.82.76 2.05 1.54l1.04 3.64 4.81-1.37-1.04-3.64C38.03 2.25 35.06.01 32.02.01H23c-3.04 0-6.02 2.24-6.85 5.17l-1.04 3.64 4.81 1.37Z"
                strokeWidth={0}
            />
        </svg>
    );
};
