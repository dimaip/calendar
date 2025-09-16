import React, { useState } from 'react';
import { css } from 'emotion';
import TagManager from 'react-gtm-module';
import Textarea from 'components/Textarea/Textarea';
import { useRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';
import customPrayerInputState from 'state/customPrayerInputState';
import DrawerWithHeader from 'components/Drawer/DrawerWithHeader';
import Button from 'components/Button/Button';
import { useTheme } from 'emotion-theming';

const CustomPrayerInput = ({
    onSave,
}: {
    onSave?: (newPrayer: { id: number; text: string }) => void;
}): JSX.Element | null => {
    const [isDirty, setIsDirty] = useState(false);
    const [inputText, setInputText] = useRecoilState(customPrayerInputState);
    const [customPrayers, setCustomPrayers] = useRecoilState(customPrayersState('Sugubaja'));
    const theme = useTheme();

    const changeInputHandler = (e: { target: { value: string } }): void => {
        setIsDirty(true);
        setInputText(e.target.value);
    };

    const cancelPrayerHandler = (): void => {
        if (!isDirty || confirm('Выйти без сохранения?')) {
            setInputText(null);
            setIsDirty(false);
        }
    };

    const savePrayerHandler = (): void => {
        if (inputText) {
            const id = Date.now();
            const newPrayer = {
                id,
                text: inputText,
            };
            setCustomPrayers([...customPrayers, newPrayer]);
            TagManager.dataLayer({
                dataLayer: {
                    event: 'customPrayerAdded',
                },
            });
            onSave?.(newPrayer);
        }
        setInputText(null);
        setIsDirty(false);
    };

    const placeholder = 'Введите текст молитвы';

    return inputText !== null ? (
        <DrawerWithHeader onClose={cancelPrayerHandler} header={<div>Добавить молитву</div>}>
            <label>
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <Textarea
                        onChange={changeInputHandler}
                        value={inputText}
                        placeholder={`${placeholder}…`}
                        autoFocus
                        className={css`
                            min-height: 70vh !important;
                        `}
                    />
                </div>
            </label>
            <Button
                className={css`
                    background-color: ${theme.colours.primary};
                    color: ${theme.colours.white} !important;
                    border-radius: 8px;
                    margin-top: 12px;
                `}
                onClick={savePrayerHandler}
            >
                Сохранить
            </Button>
        </DrawerWithHeader>
    ) : null;
};

export default CustomPrayerInput;
