import React, { ReactNode, Suspense, useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import TagManager from 'react-gtm-module';
import Button from 'components/Button/Button';
import Drawer from 'components/Drawer/Drawer';
import Textarea from 'components/Textarea/Textarea';
import { useRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';
import extraPrayersState from 'state/extraPrayers';
import SelectBox from 'components/SelectBox/SelectBox';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import Loader from 'components/Loader/Loader';
import Cross from 'components/svgs/Cross';

const Section = ({ children }: ReactNode): JSX.Element => {
    const theme = useTheme();
    return (
        <div
            className={css`
                position: relative;
                display: flow-root;
                background: ${theme.colours.bgGray};
                margin: 18px 0;
                padding: 18px;
                border-radius: 5px;
            `}
        >
            {children}
        </div>
    );
};

const CustomPrayers = ({ type }: { type: string }): JSX.Element => {
    const [inputText, setInputText] = useState<string | null>(null);
    const [extraPrayers, setExtraPrayers] = useRecoilState(extraPrayersState(type));
    const [customPrayers, setCustomPrayers] = useRecoilState(customPrayersState(type));

    const changeInputHandler = (e: { target: { value: string } }): void => {
        setInputText(e.target.value);
    };

    const savePrayerHandler = (): void => {
        setCustomPrayers([
            ...customPrayers,
            {
                id: Date.now(),
                text: inputText,
            },
        ]);
        setInputText(null);
        TagManager.dataLayer({
            dataLayer: {
                event: 'customPrayerAdded',
                namesType: type,
            },
        });
    };

    const placeholder = 'Введите текст молитвы';

    return (
        <span>
            {extraPrayers.map((prayerId) => (
                <Section key={prayerId}>
                    <Button
                        className={css`
                            position: absolute;
                            top: 0;
                            right: 0;
                        `}
                        onClick={() => setExtraPrayers(extraPrayers.filter((i) => i !== prayerId))}
                    >
                        <Cross />
                    </Button>
                    <Suspense fallback={<Loader />}>
                        <MdxLoader src={`BratMolitvoslov/${prayerId}`} lang="ru" />
                    </Suspense>
                </Section>
            ))}
            {customPrayers.map((prayer) => {
                return (
                    <Section key={prayer.id}>
                        <Button
                            className={css`
                                position: absolute;
                                top: 0;
                                right: 0;
                            `}
                            onClick={() => setCustomPrayers(customPrayers.filter((i) => i.id !== prayer.id))}
                        >
                            <Cross />
                        </Button>
                        <div
                            className={css`
                                white-space: break-spaces;
                            `}
                        >
                            {prayer.text}
                        </div>
                    </Section>
                );
            })}
            <SelectBox
                className={css`
                    width: 100%;
                `}
                items={[
                    { value: '', label: 'Добавить молитву' },
                    {
                        value: 'PravdaMir',
                        label: 'Молитва о правде и мире',
                    },
                    {
                        value: 'BratEdinstvo',
                        label: 'Молитва о братском единстве еп. Макария (Опоцкого)',
                    },
                    {
                        value: 'ChurchCountry',
                        label: 'Молитва Господу о церкви и стране',
                    },
                    {
                        value: 'Neplyuev',
                        label: 'Молитва Н. Н. Неплюева о братстве',
                    },
                    {
                        value: 'Opotsky1',
                        label: 'Молитва о созидании Тела Церкви Христовой, об исполнении Нового Завета в Крови Его',
                    },
                    {
                        value: 'Opotsky2',
                        label: 'Молитва пред вкушением святого Хлеба и Чаши благословения',
                    },
                    {
                        value: 'Opotsky3',
                        label: 'Молитва перед Причастием (с особыми прошениями)',
                    },
                    {
                        value: 'addCustom',
                        label: 'Добавить свою молитву',
                    },
                ].filter((i) => !extraPrayers.includes(i.value))}
                value=""
                onChange={(prayerId) => {
                    if (prayerId === 'addCustom') {
                        setInputText('');
                    } else if (prayerId) {
                        setExtraPrayers([...extraPrayers, prayerId]);
                        TagManager.dataLayer({
                            dataLayer: {
                                event: 'extraPrayerAdded',
                                namesType: type,
                            },
                        });
                    }
                }}
            />

            {inputText !== null && (
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
            )}
        </span>
    );
};

export default CustomPrayers;
