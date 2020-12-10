import React, { useState, useContext } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Cross from 'components/svgs/Cross';
import Button from 'components/Button/Button';
import Pencil from 'components/svgs/Pencil';
import Drawer from 'components/Drawer/Drawer';
import Input from 'components/Input/Input';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import { useRecoilValue } from 'recoil';

const ScriptEditorInput = ({ id }) => {
    const theme = useTheme();
    const [inputReaderName, setInputReaderName] = useState(null);
    const scriptEditorIsActive = useRecoilValue(scriptEditorIsActiveState);

    const storageKey = `ScriptEditor.${id}`;
    const storedReaderName = window.localStorage.getItem(storageKey);

    const changeInputHandler = e => {
        setInputReaderName(e.target.value);
    };
    const saveNameHandler = () => {
        localStorage.setItem(storageKey, inputReaderName);
        setInputReaderName(null);
    };
    const toggleEditorHandler = () => {
        setInputReaderName(storedReaderName || '');
    };
    const clearInputHandler = () => {
        window.localStorage.setItem(storageKey, '');
        setInputReaderName('');
    };

    return (
        <div
            className={css`
                display: inline-flex;
                padding-left: 0px;
            `}
        >
            {scriptEditorIsActive ? (
                <div>
                    <div
                        className={css`
                            margin-right: 10px;
                            margin-left: -5px;
                        `}
                    >
                        <Button onClick={toggleEditorHandler}>
                            {storedReaderName ? (
                                <span
                                    className={css`
                                        color: ${theme.colours.darkGray};
                                        text-transform: initial;
                                        margin-right: 6px;
                                    `}
                                >
                                    {storedReaderName}
                                </span>
                            ) : null}
                            <Pencil colour={theme.colours.darkGray} />
                        </Button>
                    </div>
                    {inputReaderName !== null && (
                        <Drawer onClose={saveNameHandler}>
                            <label>
                                <p
                                    className={css`
                                        margin-bottom: 8px;
                                    `}
                                >
                                    Имя чтеца
                                </p>
                                <div
                                    className={css`
                                        position: relative;
                                    `}
                                >
                                    <Input
                                        onChange={changeInputHandler}
                                        onEnter={saveNameHandler}
                                        value={inputReaderName}
                                        placeholder="Введите имя…"
                                        autoFocus
                                    />
                                    <Button
                                        onClick={clearInputHandler}
                                        className={css`
                                            position: absolute;
                                            right: 0;
                                            font-size: 14px;
                                            margin-left: 0px;
                                        `}
                                    >
                                        <Cross />
                                    </Button>
                                </div>
                            </label>
                        </Drawer>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default ScriptEditorInput;
