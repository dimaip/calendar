const getTheme = primary => ({
    colours: {
        primary: primary || '#AE841A',
        primaryTint: 'rgba(255,255,255,0.8)',
        gray: '#8e8e93',
        darkGray: '#201f24',
        bgGrayLight: '#fafafc',
        bgGray: '#EFEFF4',
        lineGray: '#CECED2',
        red: '#ff4e4e',
    },
});

export default getTheme;
