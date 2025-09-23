import React, { useState } from 'react';
import { css } from 'emotion';
import TagManager from 'react-gtm-module';
import Textarea from 'components/Textarea/Textarea';
import { useRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';
import customPrayerInputState from 'state/customPrayerInputState';
import customPrayerEditIdState from 'state/customPrayerEditIdState';
import DrawerWithHeader from 'components/Drawer/DrawerWithHeader';
import Button from 'components/Button/Button';
import { useTheme } from 'emotion-theming';

const CustomPrayerInput = ({
    onSave,
}: {
    onSave?: (newPrayer: { id: number; text: string }) => void;
}): JSX.Element | null => {
    const [isDirty, setIsDirty] = useState(false);
    const [inputText, setInputText] = useRecoilState<string | null>(customPrayerInputState);
    const [customPrayers, setCustomPrayers] = useRecoilState<{ id: number; text: string }[]>(
        customPrayersState('Sugubaja') as any
    );
    const [editId, setEditId] = useRecoilState<number | null>(customPrayerEditIdState);
    const theme = useTheme();

    const changeInputHandler = (e: { target: { value: string } }): void => {
        setIsDirty(true);
        setInputText(e.target.value);
    };

    const cancelPrayerHandler = (): void => {
        if (!isDirty || confirm('Выйти без сохранения?')) {
            setInputText(null);
            setIsDirty(false);
            setEditId(null);
        }
    };

    const savePrayerHandler = (): void => {
        if (inputText) {
            if (editId) {
                const updated = customPrayers.map((p: { id: number; text: string }) =>
                    p.id === editId ? { ...p, text: inputText } : p
                );
                setCustomPrayers(updated);
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'customPrayerEdited',
                    },
                });
            } else {
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
        }
        setInputText(null);
        setIsDirty(false);
        setEditId(null);
    };

    const placeholder = 'Введите текст молитвы';

    return inputText !== null ? (
        <DrawerWithHeader
            onClose={cancelPrayerHandler}
            header={<div>{editId ? 'Редактирование молитвы' : 'Добавить молитву'}</div>}
        >
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
