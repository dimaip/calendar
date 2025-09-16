import React from 'react';
import { css } from 'emotion';
import getTheme from 'styles/getTheme';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useRecoilValue } from 'recoil';
import themeState from 'state/themeState';
import LeftIcon from 'components/svgs/LeftIcon';
import Button from 'components/Button/Button';

const Drawer = ({ children, onClose, header }) => {
    const themeStateValue = useRecoilValue(themeState);
    const theme = getTheme(null, themeStateValue);

    const backElement = (
        <div
            className={css`
                margin-left: -8px;
                margin-top: 8px;
                margin-bottom: 4px;
                &:hover {
                    opacity: 0.8;
                }
            `}
        >
            <LeftIcon />
        </div>
    );
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
                    padding: 0px 16px 16px 16px;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    color: inherit !important;
                `,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={onClose}>{backElement}</Button>
                <div>{header}</div>
            </div>
            {children}
        </SwipeableDrawer>
    );
};
export default Drawer;
