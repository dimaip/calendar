import React from 'react';
import { useTheme } from 'emotion-theming';

export default () => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={71} height={70} fill="none">
            <path
                fill="#AC1CA3"
                stroke="#AC1CA3"
                strokeLinejoin="round"
                strokeWidth={2.826}
                d="M26 68.586c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24Z"
            />
            <path
                fill={theme.colours.white}
                stroke="#AC1CA3"
                strokeLinejoin="round"
                strokeWidth={2.826}
                d="M36.115 58.402c-13.257 0-24-10.742-24-24 0-3.876.927-7.538 2.56-10.776C7.142 27.626 2 35.572 2 44.732c0 13.179 10.63 23.86 23.74 23.86 9.076 0 16.953-5.12 20.948-12.642a23.881 23.881 0 0 1-10.573 2.452Z"
            />
            <path
                fill={theme.colours.white}
                stroke="#AD8518"
                strokeLinejoin="round"
                strokeWidth={2.291}
                d="M45.25 50.499c13.392 0 24.249-10.857 24.249-24.25C69.499 12.857 58.642 2 45.249 2 31.857 2 21 12.857 21 26.25c0 13.392 10.857 24.249 24.25 24.249Z"
            />
            <path
                stroke="#AD8518"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.291}
                d="M45.433 37.223v9.165M45.433 6.116V14.8M33.602 26.29h-7.747M65.012 26.29h-8.958M37.53 34.276l-6.34 6.339M59.669 12.137l-6.209 6.209M37.238 18.237l-5.681-5.681M59.25 40.25l-6.34-6.334M59.887 20.264l1.733-.72M50.628 13.258l2.235-5.39M38.698 11.489l-.714-1.728"
            />
            <path
                stroke="#AD8518"
                strokeLinejoin="round"
                strokeWidth={2.291}
                d="M45.102 37.036c5.928 0 10.733-4.806 10.733-10.733 0-5.928-4.805-10.733-10.733-10.733-5.927 0-10.733 4.805-10.733 10.733 0 5.927 4.806 10.733 10.733 10.733Z"
            />
            <path
                stroke="#AD8518"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.291}
                d="m33.638 21.55-3.06-1.263M31.203 32.147l-1.734.713M40.373 36.982l-2.536 6.116M50.422 39.784l.713 1.733M55.753 30.967l2.666 1.103"
            />
        </svg>
    );
};
