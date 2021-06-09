import isDarkMode from 'utils/isDarkMode';

export const gray1a = '#201f24';
export const gray1b = '#2c2b32';
export const gray1c = '#38373f';
export const gray2a = '#8e8e93';
export const gray2b = '#acacb0';
export const gray3 = '#CECED2';
export const gray4 = '#EFEFF4';
export const gray5 = '#fafafc';
export const gray6 = '#ffffff';
export const blue = '#4169E1';
export const red = '#ff4e4e';

const getTheme = (primary, overrideDarkMode = null) => {
    const dark = overrideDarkMode === null ? isDarkMode() : overrideDarkMode;

    return {
        colours: {
            primary: primary || (dark ? '#E1B74D' : '#AE841A'),
            primaryTint: 'rgba(255,255,255,0.8)',
            lightGray: dark ? gray2a : gray2b,
            gray: dark ? gray4 : gray2a,
            darkGray: dark ? gray6 : gray1a,
            bgGrayLight: dark ? gray1b : gray5,
            bgGray: dark ? gray1c : gray4,
            lineGray: dark ? gray2a : gray3,
            white: dark ? gray1a : gray6,
            blue,
            red,
        },
    };
};

export default getTheme;
