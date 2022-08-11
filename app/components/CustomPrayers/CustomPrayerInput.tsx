import React from 'react';
import { css } from 'emotion';
import TagManager from 'react-gtm-module';
import Drawer from 'components/Drawer/Drawer';
import Textarea from 'components/Textarea/Textarea';
import { useRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';
import customPrayerInputState from 'state/customPrayerInputState';

const CustomPrayerInput = ({
    onSave,
}: {
    onSave?: (newPrayer: { id: number; text: string }) => void;
}): JSX.Element | null => {
    const [inputText, setInputText] = useRecoilState(customPrayerInputState);
    const [customPrayers, setCustomPrayers] = useRecoilState(customPrayersState('Sugubaja'));

    const changeInputHandler = (e: { target: { value: string } }): void => {
        setInputText(e.target.value);
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
    };

    const placeholder = 'Введите текст молитвы';

    return inputText !== null ? (
        <Drawer onClose={savePrayerHandler}>
            <label>
                <p
                    className={css`
                        margin-bottom: 8px;
                    `}
                >
                    Добавить молитву
                </p>
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
                    />
                </div>
            </label>
        </Drawer>
    ) : null;
};

export default CustomPrayerInput;
