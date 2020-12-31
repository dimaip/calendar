import React, { useState } from 'react';
import { css } from 'emotion';
import getTheme from 'styles/getTheme';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useRecoilValue } from 'recoil';
import themeState from 'state/themeState';

const Drawer = ({ children, onClose }) => {
    const themeStateValue = useRecoilValue(themeState);
    const theme = getTheme(null, themeStateValue);

    return (
        <SwipeableDrawer
            onClose={onClose}
            onOpen={() => {}}
            open
            anchor="bottom"
            classes={{
                paper: css`
                    background-color: ${theme.colours.bgGrayLight} !important;
                    box-shadow: 0 0 2px 0 ${theme.colours.lineGray};
                    padding: 48px 16px;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    color: inherit !important;
                `,
            }}
        >
            <div
                className={css`
                    position: absolute;
                    margin: 0 auto;
                    top: 16px;
                    left: 0;
                    right: 0;
                    width: 36px;
                    height: 4px;
                    background-color: ${theme.colours.lineGray};
                    border-radius: 8px;
                `}
            />
            {children}
        </SwipeableDrawer>
    );
};
export default Drawer;
