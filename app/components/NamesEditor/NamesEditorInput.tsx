import React, { useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Cross from 'components/svgs/Cross';
import Button from 'components/Button/Button';
import Pencil from 'components/svgs/Pencil';
import Drawer from 'components/Drawer/Drawer';
import Textarea from 'components/Textarea/Textarea';
import { useRecoilState } from 'recoil';
import namesState from 'state/namesState';

const NamesEditorInput = ({ type }: { type: string }): JSX.Element => {
    const theme = useTheme();
    const [inputReaderName, setInputReaderName] = useState<string | null>(null);

    const [names, setNames] = useRecoilState(namesState<string>(type));

    const changeInputHandler = (e: { target: { value: string } }): void => {
        setInputReaderName(e.target.value);
    };

    const saveNameHandler = (): void => {
        setNames(inputReaderName?.trim() || '');
        setInputReaderName(null);
    };
    const toggleEditorHandler = (): void => {
        setInputReaderName(names || '');
    };
    const clearInputHandler = (): void => {
        setNames('');
        setInputReaderName('');
    };
    return (
        <span>
            <Button
                style={{
                    padding: 0,
                    textAlign: 'left',
                    verticalAlign: 'bottom',
                    display: names ? 'block' : 'inline',
                }}
                onClick={toggleEditorHandler}
            >
                <span
                    className={css`
                        color: ${theme.colours.red};
                        text-transform: initial;
                        margin-right: 6px;
                        white-space: pre-line;
                    `}
                >
                    {names ? `[${names}]` : '[введите имена]'}
                </span>
                <Pencil colour={theme.colours.darkGray} />
            </Button>
            {inputReaderName !== null && (
                <Drawer onClose={saveNameHandler}>
                    <label>
                        <p
                            className={css`
                                margin-bottom: 8px;
                            `}
                        >
                            {type}
                        </p>
                        <div
                            className={css`
                                position: relative;
                            `}
                        >
                            <Textarea
                                onChange={changeInputHandler}
                                value={inputReaderName}
                                placeholder="Введите имена…"
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
        </span>
    );
};

export default NamesEditorInput;
