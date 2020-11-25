import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import getTheme from 'styles/getTheme';
const theme = getTheme();

const Drawer = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <div
            className={css`
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                flex-direction: column;
                z-index: 10;
            `}
        >
            <div
                role="button"
                className={css`
                    flex-grow: 1;
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.3);
                `}
                onClick={onClose}
            />
            <div
                className={css`
                    position: relative;
                    background-color: ${theme.colours.bgGrayLight};
                    z-index: 1;
                    box-shadow: 0 0 2px 0 ${theme.colours.lineGray};
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
                        background-color: ${theme.colours.lineGray};
                        border-radius: 8px;
                    `}
                />
                {children}
            </div>
        </div>,
        document.getElementById('react-portal')
    );
};
export default Drawer;
