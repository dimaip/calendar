import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import getTheme from 'styles/getTheme';

const NoDarkMode = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const theme = getTheme(undefined, false);
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default NoDarkMode;
