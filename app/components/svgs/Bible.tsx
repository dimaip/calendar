import React from 'react';
import { useTheme } from 'emotion-theming';

export default ({ colour }: { colour?: string }): JSX.Element => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.85 22">
            <path
                fill="none"
                d="M13.28 16.49V2.7a.64.64 0 0 0 .33-.55c0-.35-.29-.64-.64-.64-.25 0-.46.15-.57.36H2.48a.636.636 0 0 0-.57-.36c-.35 0-.64.29-.64.64 0 .25.15.47.36.57v13.77c-.19.11-.32.31-.32.54 0 .35.29.64.64.64.23 0 .43-.13.54-.32h9.95c.11.2.31.35.56.35.35 0 .64-.29.64-.64 0-.25-.15-.47-.36-.57Zm-.65.06c-.06.04-.11.1-.15.16H2.49a.661.661 0 0 0-.22-.22V2.66c.06-.04.11-.09.15-.15h10.03c.05.07.11.13.18.17v13.87Zm-8.6 3.88.65-.56c.19-.16.48-.16.66.01l.54.5v-1.44H4.02v1.5Z"
            />
            <path
                d="M7.7 6.42c-.4 0-.72.32-.72.72s.32.72.72.72.72-.32.72-.72-.32-.72-.72-.72Z"
                fill={colour || theme.colours.darkGray}
            />
            <path
                d="M2.42 2.51c-.04.06-.09.11-.15.15v13.83c.09.05.16.13.22.22h9.99c.04-.06.09-.12.15-.16V2.68a.581.581 0 0 1-.18-.17H2.42Zm8.63 5.21a.64.64 0 0 1-.55-.33H9.13c-.1.58-.54 1.05-1.12 1.18v2.88l1.56 1.56c.05-.01.1-.03.15-.03.35 0 .64.29.64.64s-.29.64-.64.64-.64-.29-.64-.64c0-.05.02-.1.03-.15l-1.1-1.1v2.45c.18.11.31.31.31.53 0 .35-.29.64-.64.64s-.64-.29-.64-.64c0-.24.14-.44.33-.55v-3.09l-1.59-1.59c-.05.01-.1.03-.16.03-.35 0-.64-.29-.64-.64s.29-.64.64-.64.64.29.64.64c0 .05-.02.1-.03.15l1.14 1.14V8.57c-.58-.13-1.03-.6-1.13-1.19H4.77c-.12.17-.3.29-.52.29-.35 0-.64-.29-.64-.64s.29-.64.64-.64c.25 0 .45.14.56.35h1.47c.15-.52.56-.92 1.09-1.03V4.18a.64.64 0 0 1-.33-.55c0-.35.29-.64.64-.64s.64.29.64.64c0 .23-.13.42-.31.53v1.55c.52.12.93.52 1.08 1.03h1.41c.11-.18.31-.31.54-.31.35 0 .64.29.64.64s-.29.64-.64.64Z"
                fill={colour || theme.colours.darkGray}
            />
            <path
                d="M13.24.34H1.7C.81.34.1 1.06.1 1.94v15.4c0 .88.71 1.6 1.6 1.6h1.35v2.58a.493.493 0 0 0 .82.37l1.14-.98 1.05.97c.09.09.22.13.34.13.07 0 .14-.01.2-.04.18-.08.3-.26.3-.46v-2.58h6.35c.88 0 1.6-.71 1.6-1.6V1.94c0-.88-.71-1.6-1.6-1.6ZM5.9 20.38l-.54-.5a.49.49 0 0 0-.66-.01l-.65.56v-1.5h1.86v1.44ZM13 17.7c-.25 0-.45-.14-.56-.35H2.49c-.11.19-.31.32-.54.32-.35 0-.64-.29-.64-.64 0-.23.13-.43.32-.54V2.72a.636.636 0 0 1-.36-.57c0-.35.29-.64.64-.64.25 0 .46.15.57.36h9.92c.1-.21.32-.36.57-.36.35 0 .64.29.64.64 0 .24-.14.44-.33.55v13.79c.21.1.36.32.36.57 0 .35-.29.64-.64.64Z"
                fill={colour || theme.colours.darkGray}
            />
        </svg>
    );
};
