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
import { bratMolitvoslovPrayers } from 'containers/Service/Texts/Texts';
import customPrayerInputState from 'state/customPrayerInputState';

import CustomPrayerInput from './CustomPrayerInput';

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
    const [_inputText, setInputText] = useRecoilState(customPrayerInputState);
    const [extraPrayers, setExtraPrayers] = useRecoilState(extraPrayersState(type));
    const [customPrayers] = useRecoilState(customPrayersState('Sugubaja'));

    return (
        <div style={{ marginTop: 12, marginBottom: 12 }}>
            {extraPrayers.map((prayerId) => {
                const isCustomPrayer = /^\d+$/.test(prayerId)
                const customPrayer = isCustomPrayer && customPrayers?.find((i) => String(i.id) === String(prayerId));
                if (isCustomPrayer && !customPrayer) {
                    return null;
                }
                return (
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
                            {isCustomPrayer ? (
                                <div
                                    className={css`
                                        white-space: break-spaces;
                                    `}
                                >
                                    {customPrayer.text}
                                </div>
                            ) : (
                                <MdxLoader src={`BratMolitvoslov/${prayerId}`} lang="ru" />
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
                    { value: '', label: 'Добавить молитву' },
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
