import React, { ReactNode, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Dots from 'components/svgs/Dots';
import Button from 'components/Button/Button';

export const DotsMenuContext = React.createContext({
    toggleOpen: () => {},
    isOpen: false,
    setIsOpen: (val: boolean) => {},
});

const MENU_WIDTH = 160;

const DropDown = ({ toggleOpen, children, top = 36, left = 0 }) => {
    const theme = useTheme();
    return ReactDOM.createPortal(
        <>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    toggleOpen();
                }}
                className={css`
                    background-color: rgba(0, 0, 0, 0.3);
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1350;
                `}
            ></div>
            <div
                className={css`
                    position: fixed;
                    background-color: ${theme.colours.white};
                    top: ${top}px;
                    left: ${left}px;
                    border: 1px solid ${theme.colours.lineGray};
                    z-index: 1351;
                    border-radius: 8px;
                    padding: 4px 8px;
                    width: ${MENU_WIDTH}px;
                `}
            >
                {children}
            </div>
        </>,
        document.getElementById('react-portal')
    );
};

const DotsMenu = ({ children, className }: { children: ReactNode; className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef();
    const toggleOpen = (e) => {
        e?.stopPropagation?.();
        setIsOpen(!isOpen);
    };
    const boundingClientRect = buttonRef.current?.getBoundingClientRect();
    const left = Math.min(window.innerWidth - (MENU_WIDTH + 5), boundingClientRect?.left);
    return (
        <DotsMenuContext.Provider value={{ isOpen, setIsOpen, toggleOpen }}>
            <Button
                ref={buttonRef}
                onClick={toggleOpen}
                className={`${className} ${css`
                    margin-top: 1px;
                `}`}
            >
                <Dots />
            </Button>
            {isOpen && (
                <DropDown top={boundingClientRect?.top} left={left} toggleOpen={toggleOpen}>
                    <div style={{ width: MENU_WIDTH }}>{children}</div>
                </DropDown>
            )}
        </DotsMenuContext.Provider>
    );
};
export default DotsMenu;
