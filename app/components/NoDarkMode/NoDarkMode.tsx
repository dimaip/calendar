import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import getTheme from 'styles/getTheme';

const NoDarkMode = <T extends (props: P) => JSX.Element, P extends Record<string, unknown>>(Component: T) => (
    props: P
): JSX.Element => {
    const theme = getTheme(undefined, false);
    return (
        <ThemeProvider theme={theme}>
            <Component {...props} />
        </ThemeProvider>
    );
};

export default NoDarkMode;
