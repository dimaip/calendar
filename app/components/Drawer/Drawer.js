import React, { useState } from 'react';
import { css } from 'emotion';
import getTheme from 'styles/getTheme';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const theme = getTheme();

const Drawer = ({ children, onClose, onOpen, anchor, onEnter }) => {
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            onEnter();
        }
    };
    return (
        <div>
            <SwipeableDrawer onClose={onClose} onOpen={onOpen} open anchor={anchor} onKeyDown={handleKeyDown}>
                <div
                    className={css`
                        width: 100%;
                        background-color: ${theme.colours.white};
                    `}
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
                </div>
            </SwipeableDrawer>
        </div>
    );
};
export default Drawer;
