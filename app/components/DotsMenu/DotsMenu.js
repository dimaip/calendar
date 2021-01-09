import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import Dots from 'components/svgs/Dots';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import ChangeThemeButton from 'components/ChangeThemeButton/ChangeThemeButton';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Share from 'components/Share/Share';
import { useParams } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import ScriptEditorToggle from 'components/ScriptEditor/ScriptEditorToggle';

export const DotsMenuContext = React.createContext({ toggleOpen: () => {}, isOpen: false, setIsOpen: () => {} });

const DropDown = ({ toggleOpen, children }) => {
    const theme = useTheme();
    return ReactDOM.createPortal(
        <>
            <div
                onClick={e => {
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
                    z-index: 9;
                `}
            ></div>
            <div
                className={css`
                    position: fixed;
                    background-color: ${theme.colours.white};
                    top: 36px;
                    right: 0;
                    border: 1px solid ${theme.colours.lineGray};
                    z-index: 10;
                    border-radius: 8px;
                    padding: 4px 8px;
                `}
            >
                {children}
            </div>
        </>,
        document.getElementById('react-portal')
    );
};

const DotsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    const { date } = useParams();
    return (
        <DotsMenuContext.Provider value={{ isOpen, setIsOpen, toggleOpen }}>
            <Button
                onClick={toggleOpen}
                className={css`
                    margin-top: 1px;
                `}
            >
                <Dots />
            </Button>
            {isOpen && (
                <DropDown toggleOpen={toggleOpen}>
                    <ZoomControlToggle />
                    <ChangeThemeButton />
                    <ScriptEditorToggle />
                    <Share date={date} />
                </DropDown>
            )}
        </DotsMenuContext.Provider>
    );
};
export default DotsMenu;
