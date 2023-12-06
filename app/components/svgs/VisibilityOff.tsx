import React from 'react';
import { useTheme } from 'emotion-theming';

const VisibilityOff = () => {
    const theme = useTheme();
    return (
        <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.7 9.44">
            <path
                fill={theme.colours.primary}
                d="M22.39.2c-.36-.3-.9-.25-1.2.11-2.64 3.17-6.14 4.91-9.85 4.91S4.14 3.47 1.5.31A.834.834 0 0 0 .31.2C-.05.5-.1 1.03.2 1.39c.87 1.04 1.83 1.93 2.85 2.69l-.83.83c-.33.33-.33.87 0 1.2s.87.33 1.2 0L4.5 5.03c.71.41 1.45.78 2.21 1.05L6.1 7.57a.85.85 0 0 0 1.57.65l.68-1.65c.7.16 1.42.25 2.15.29v1.72a.85.85 0 1 0 1.7 0V6.86c.73-.05 1.44-.13 2.15-.29l.68 1.65a.85.85 0 0 0 1.57-.65l-.61-1.49c.76-.28 1.49-.64 2.2-1.05l1.07 1.07c.33.33.87.33 1.2 0s.33-.87 0-1.2l-.82-.82c1.02-.76 1.99-1.65 2.86-2.69.3-.36.25-.9-.11-1.2Z"
            />
        </svg>
    );
};

export default VisibilityOff;
