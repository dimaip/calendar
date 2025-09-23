import React, { ReactNode, Suspense } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import TagManager from 'react-gtm-module';
import Button from 'components/Button/Button';
import { useRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';
import extraPrayersState from 'state/extraPrayers';
import SelectBox from 'components/SelectBox/SelectBox';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import Loader from 'components/Loader/Loader';
import Cross from 'components/svgs/Cross';
import Pencil from 'components/svgs/Pencil';
import { bratMolitvoslovPrayers } from 'containers/Service/Texts/Texts';
import customPrayerInputState from 'state/customPrayerInputState';
import customPrayerEditIdState from 'state/customPrayerEditIdState';

import CustomPrayerInput from './CustomPrayerInput';
import PlusIcon from 'components/svgs/PlusIcon';

const Section = ({ children }: { children: ReactNode }): JSX.Element => {
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
    const [_inputText, setInputText] = useRecoilState(customPrayerInputState);
    const [, setEditId] = useRecoilState(customPrayerEditIdState);
    const [extraPrayers, setExtraPrayers] = useRecoilState(extraPrayersState(type));
    const [customPrayers] = useRecoilState(customPrayersState('Sugubaja'));

    return (
        <div style={{ marginTop: 12, marginBottom: 12 }} className="customPrayers">
            {extraPrayers.map((prayerId) => {
                const isCustomPrayer = /^\d+$/.test(prayerId);
                const customPrayer = isCustomPrayer && customPrayers?.find((i) => String(i.id) === String(prayerId));
                if (isCustomPrayer && !customPrayer) {
                    return null;
                }
                return (
                    <Section key={prayerId}>
                        {isCustomPrayer && (
                            <Button
                                className={css`
                                    position: absolute;
                                    top: 0;
                                    right: 36px;
                                `}
                                onClick={() => {
                                    if (customPrayer) {
                                        setEditId(customPrayer.id);
                                        setInputText(customPrayer.text || '');
                                    }
                                }}
                                title="Редактировать молитву"
                            >
                                <Pencil />
                            </Button>
                        )}
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
                            {isCustomPrayer ? (
                                <div
                                    className={css`
                                        white-space: break-spaces;
                                    `}
                                >
                                    {customPrayer.text}
                                </div>
                            ) : (
                                <MdxLoader src={`BratMolitvoslov/${prayerId}`} lang="ru" isCustomPrayer />
                            )}
                        </Suspense>
                    </Section>
                );
            })}
            <SelectBox
                className={css`
                    width: 100%;
                `}
                items={[
                    {
                        value: '',
                        label: (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <div style={{ marginRight: 6 }}>Добавить молитву</div> <PlusIcon width={16} />
                            </div>
                        ),
                    },
                    ...bratMolitvoslovPrayers,
                    ...customPrayers.map((p) => ({
                        value: p.id,
                        label: p.text?.split?.('\n')?.[0],
                    })),
                    {
                        value: 'addCustom',
                        label: 'Добавить свою молитву',
                    },
                ].filter((i) => !extraPrayers.includes(String(i.value)))}
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
            <CustomPrayerInput onSave={(newPrayer) => setExtraPrayers([...extraPrayers, newPrayer.id])} />
        </div>
    );
};

export default CustomPrayers;
