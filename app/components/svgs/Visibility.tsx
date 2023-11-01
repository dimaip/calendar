import React from 'react';
import { useTheme } from 'emotion-theming';

const Visibility = () => {
    const theme = useTheme();
    return (
        <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.21 14.63">
            <path d="M1.11 8.75c5.8 6.96 15.2 6.96 21 0-5.8-6.95-15.2-6.95-21 0Z" fill="#fff" />
            <path
                d="M11.61 14.82c-4.22 0-8.18-1.96-11.15-5.52L0 8.75l.45-.54c2.97-3.56 6.93-5.53 11.16-5.53s8.18 1.96 11.15 5.52l.45.54-.45.54c-2.97 3.56-6.93 5.52-11.15 5.52ZM2.23 8.75c2.58 2.82 5.88 4.37 9.37 4.37s6.79-1.54 9.37-4.37c-2.58-2.82-5.88-4.37-9.37-4.37-3.49 0-6.79 1.54-9.37 4.37Z"
                fill={theme.colours.primary}
                strokeWidth={0}
            />
            <circle cx="11.61" cy="8.75" r="4.64" fill="#fff" />
            <path
                d="M11.61 14.24c-3.03 0-5.49-2.46-5.49-5.49s2.46-5.49 5.49-5.49 5.49 2.46 5.49 5.49-2.46 5.49-5.49 5.49Zm0-9.28c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79Z"
                fill={theme.colours.primary}
                strokeWidth={0}
            />
            <path d="m3.09 4.11 1.52 1.52" fill="#fff" />
            <path
                d="M4.61 6.48c-.22 0-.44-.08-.6-.25L2.49 4.71c-.33-.33-.33-.87 0-1.2s.87-.33 1.2 0l1.52 1.52a.851.851 0 0 1-.6 1.45Z"
                fill={theme.colours.primary}
                strokeWidth={0}
            />
            <path d="m20.13 4.11-1.52 1.53" fill="#fff" />
            <path
                d="M18.61 6.49c-.22 0-.44-.08-.6-.25a.851.851 0 0 1 0-1.2l1.52-1.52c.33-.33.87-.33 1.2 0s.33.87 0 1.2l-1.52 1.52c-.17.17-.38.25-.6.25Zm-7-2.11a.85.85 0 0 1-.85-.85V1.04a.85.85 0 1 1 1.7 0v2.5c0 .47-.38.85-.85.85Z"
                fill={theme.colours.primary}
                strokeWidth={0}
            />
            <path d="m7.14 1.72.95 2.32" fill="#fff" />
            <path
                d="M8.1 4.89c-.33 0-.65-.2-.79-.53l-.95-2.31c-.18-.43.03-.93.46-1.11.43-.18.93.03 1.11.46l.95 2.31c.18.43-.03.93-.46 1.11-.11.04-.22.06-.32.06Z"
                fill={theme.colours.primary}
                strokeWidth={0}
            />
            <path d="m16.07 1.72-.95 2.32" fill="#fff" />
            <path
                d="M15.12 4.89c-.11 0-.22-.02-.32-.06a.854.854 0 0 1-.46-1.11l.95-2.31a.85.85 0 0 1 1.57.65l-.95 2.31c-.13.33-.45.53-.79.53Z"
                fill={theme.colours.primary}
                strokeWidth={0}
            />
            <path
                fill={theme.colours.primary}
                fill-rule="evenodd"
                stroke-width="0"
                d="M14.39 7.85a2.923 2.923 0 0 1-2.78 3.82c-1.61 0-2.92-1.31-2.92-2.92S10 5.83 11.61 5.83c.21 0 .42.02.62.07a1.451 1.451 0 1 0 2.15 1.95Z"
            />
        </svg>
    );
};

export default Visibility;
