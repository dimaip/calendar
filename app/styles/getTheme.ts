import { createTheme } from '@mui/material/styles';
import type { Theme as MuiTheme } from '@mui/material/styles';

import isDarkMode from 'utils/isDarkMode';

const gray1a = '#201f24';
const gray1b = '#2c2b32';
const gray1c = '#38373f';
const gray2a = '#717175';
const gray2b = '#acacb0';
const gray3 = '#CECED2';
const gray4 = '#EFEFF4';
const gray5 = '#fafafc';
const gray6 = '#ffffff';
const blue = '#4169E1';

export interface AppColours {
    primary: string;
    primaryTint: string;
    lightGray: string;
    gray: string;
    darkGray: string;
    bgGrayLight: string;
    bgGray: string;
    lineGray: string;
    red: string;
    white: string;
    black: string;
    blue: string;
}

export interface AppTheme extends MuiTheme {
    colours: AppColours;
}

const themeCache = new Map<string, AppTheme>();

const getTheme = (primary: string | null | undefined, theme: unknown): AppTheme => {
    const dark = theme === 'system' ? isDarkMode() : theme === 'dark' || theme === true;
    const resolvedPrimary = primary || (dark ? '#E1B74D' : '#AE841A');
    const cacheKey = `${resolvedPrimary}:${dark ? 'dark' : 'light'}`;
    const cachedTheme = themeCache.get(cacheKey);

    if (cachedTheme) {
        return cachedTheme;
    }

    const colours: AppColours = {
        primary: resolvedPrimary,
        primaryTint: 'rgba(255,255,255,0.8)',
        lightGray: dark ? gray2a : gray2b,
        gray: dark ? gray4 : gray2a,
        darkGray: dark ? gray6 : gray1a,
        bgGrayLight: dark ? gray1b : gray5,
        bgGray: dark ? gray1c : gray4,
        lineGray: dark ? gray2a : gray3,
        red: '#ff4e4e',
        white: dark ? gray1a : gray6,
        black: dark ? gray6 : gray1a,
        blue,
    };

    const appTheme = Object.assign(
        createTheme({
            palette: {
                mode: dark ? 'dark' : 'light',
                primary: {
                    main: colours.primary,
                },
            },
        }),
        { colours }
    );
    themeCache.set(cacheKey, appTheme);
    return appTheme;
};

export default getTheme;
