import React from 'react';
import { css } from 'emotion';
import { useDispatch } from 'react-redux';
import { toggleZoomControl } from 'redux/actions/zoom';
import getTheme from 'styles/theme';
const theme = getTheme();

const Drawer = ({ children }) => {
    const dispatch = useDispatch();
    return (
        <div
            className={css`
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                flex-direction: column;
            `}
        >
            <div
                role="button"
                className={css`
                    flex-grow: 1;
                    cursor: pointer;
                `}
                onClick={() => dispatch(toggleZoomControl())}
            />
            <div
                className={css`
                    position: relative;
                    background-color: ${theme.colours.bgGray};
                    z-index: 1;
                    box-shadow: 0 0 2px 0 #ccc;
                    padding: 48px 16px;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
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
                        background-color: #ccc;
                        border-radius: 8px;
                    `}
                />
                {children}
            </div>
        </div>
    );
};
export default Drawer;
