import React, { useState } from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { truncate } from 'lodash';
import Headset from '@material-ui/icons/Headset';

import SectionHeading from './SectionHeading';

import RightIcon from 'components/svgs/RightIcon';
import TrashIcon from 'components/svgs/TrashIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import useServices from 'containers/Service/Texts/Texts';
import customPrayersState from 'state/customPrayersState';
import PlusIcon from 'components/svgs/PlusIcon';
import CustomPrayerInput from 'components/CustomPrayers/CustomPrayerInput';
import customPrayerInputState from 'state/customPrayerInputState';
import type { AppTheme } from 'styles/AppTheme';

const OptionalLink = ({ enabled, ...rest }) =>
    enabled ? (
        // @ts-expect-error
        <Link {...rest} />
    ) : (
        <span title="Данная служба в этот день не совершается" className={rest.className}>
            {rest.children}
        </span>
    );

const Services = ({ date, readings }) => {
    const theme = useTheme<AppTheme>();

    const location = useLocation();

    const services = useServices(date, readings);

    const [customPrayerInputShown, setCustomPrayerInputShown] = useState(false);

    const [_inputText, setInputText] = useRecoilState(customPrayerInputState);
    const [customPrayers, setCustomPrayers] = useRecoilState(customPrayersState('Sugubaja'));

    const groupTitles = Array.from(new Set(services.map((service) => service.group)));

    return (
        <div
            className={css`
                background: ${theme.colours.bgGray};

                margin: 0 -18px 0 -18px;
            `}
        >
            <div
                className={css`
                    padding: 0 18px 0 18px;
                    font-size: 14px;
                    color: ${theme.colours.gray};
                    padding-top: 12px;
                `}
            >
                Текст службы адаптируется под выбранную дату. Активны только те службы, которые служатся в этот день
            </div>
            {groupTitles.map((groupTitle) => {
                const servicesForGroup = services.filter((service) => service.group === groupTitle);
                if (!groupTitle) {
                    return null;
                }
                return (
                    <div
                        key={groupTitle}
                        className={css`
                            padding: 0 18px 0 18px;
                        `}
                    >
                        <SectionHeading>{groupTitle}</SectionHeading>
                        <div
                            className={css`
                                margin-top: 6px;
                                background: ${theme.colours.bgGray};
                                margin: 6px -18px 0 -18px;
                                padding: 0 18px 1px 18px;
                            `}
                        >
                            <div
                                className={css`
                                    margin: 0 -10px 18px -10px;
                                `}
                            >
                                {servicesForGroup.map((service) => (
                                    <OptionalLink
                                        enabled={service.enabled}
                                        className={css`
                                            cursor: ${service.enabled ? 'pointer' : 'arrow'};
                                            user-select: none;
                                        `}
                                        to={{
                                            pathname: `/date/${date}/service/${service.id}`,
                                            state: {
                                                backLink: location.pathname,
                                            },
                                        }}
                                        key={service.id}
                                    >
                                        <ButtonBox>
                                            <div
                                                className={css`
                                                    display: flex;
                                                    opacity: ${service.enabled ? 1 : 0.2};
                                                `}
                                            >
                                                <div
                                                    className={css`
                                                        flex-grow: 1;
                                                        flex-shrink: 1;
                                                    `}
                                                >
                                                    <p
                                                        className={css`
                                                            margin-bottom: -4px;
                                                        `}
                                                    >
                                                        {service.title}
                                                    </p>
                                                </div>
                                                {service.recording && (
                                                    <span
                                                        role="img"
                                                        aria-label="Есть аудиозапись на русском языке"
                                                        title="Есть аудиозапись на русском языке"
                                                        className={css`
                                                            display: flex;
                                                            align-items: center;
                                                            margin-left: 8px;
                                                            margin-right: 8px;
                                                            color: ${theme.colours.primary};
                                                            flex-shrink: 0;
                                                        `}
                                                    >
                                                        <Headset aria-hidden="true" fontSize="small" />
                                                    </span>
                                                )}
                                                {service.customPrayerId ? (
                                                    <div
                                                        className={css`
                                                            flex-grow: 0;
                                                            flex-shrink: 0;
                                                        `}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            if (confirm('Уверены, что хотите удалить молитву?')) {
                                                                setCustomPrayers(
                                                                    customPrayers.filter(
                                                                        (i) => i.id !== service.customPrayerId
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <TrashIcon />
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={css`
                                                            flex-grow: 0;
                                                            flex-shrink: 0;
                                                        `}
                                                    >
                                                        <RightIcon />
                                                    </div>
                                                )}
                                            </div>
                                        </ButtonBox>
                                    </OptionalLink>
                                ))}

                                {groupTitle === 'Братский молитвослов' && (
                                    <ButtonBox onClick={() => setCustomPrayerInputShown(true)}>
                                        <div
                                            className={css`
                                                display: flex;
                                                cursor: pointer;
                                            `}
                                        >
                                            <div
                                                className={css`
                                                    flex-grow: 1;
                                                    flex-shrink: 1;
                                                `}
                                            >
                                                <p
                                                    className={css`
                                                        margin-bottom: -4px;
                                                    `}
                                                >
                                                    Добавить свою молитву
                                                </p>
                                            </div>
                                            <div
                                                className={css`
                                                    flex-grow: 0;
                                                    flex-shrink: 0;
                                                    display: flex;
                                                    align-items: center;
                                                `}
                                            >
                                                <PlusIcon />
                                            </div>
                                        </div>
                                    </ButtonBox>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div
                className={css`
                    padding: 0 18px 0 18px;
                `}
            >
                <SectionHeading>Песнопения</SectionHeading>
                <div
                    className={css`
                        margin-top: 6px;
                        background: ${theme.colours.bgGray};
                        margin: 6px -18px 0 -18px;
                        padding: 0 18px 1px 18px;
                    `}
                >
                    <div
                        className={css`
                            margin: 0 -10px 18px -10px;
                        `}
                    >
                        <OptionalLink
                            enabled={truncate}
                            className={css`
                                cursor: ${'pointer'};
                                user-select: none;
                            `}
                            to={{
                                pathname: `/hymns`,
                                state: {
                                    backLink: location.pathname,
                                },
                            }}
                        >
                            <ButtonBox>
                                <div
                                    className={css`
                                        display: flex;
                                    `}
                                >
                                    <div
                                        className={css`
                                            flex-grow: 1;
                                            flex-shrink: 1;
                                        `}
                                    >
                                        <p
                                            className={css`
                                                margin-bottom: -4px;
                                            `}
                                        >
                                            Тропарион
                                        </p>
                                    </div>
                                    <div
                                        className={css`
                                            flex-grow: 0;
                                            flex-shrink: 0;
                                        `}
                                    >
                                        <RightIcon />
                                    </div>
                                </div>
                            </ButtonBox>
                        </OptionalLink>
                        <OptionalLink
                            enabled={truncate}
                            className={css`
                                cursor: ${'pointer'};
                                user-select: none;
                            `}
                            to={{
                                pathname: `/date/${date}/service/psalmsSpiritualCants`,
                                state: {
                                    backLink: location.pathname,
                                },
                            }}
                        >
                            <ButtonBox>
                                <div
                                    className={css`
                                        display: flex;
                                    `}
                                >
                                    <div
                                        className={css`
                                            flex-grow: 1;
                                            flex-shrink: 1;
                                        `}
                                    >
                                        <p
                                            className={css`
                                                margin-bottom: -4px;
                                            `}
                                        >
                                            Псалмы и духовные песнопения
                                        </p>
                                    </div>
                                    <div
                                        className={css`
                                            flex-grow: 0;
                                            flex-shrink: 0;
                                        `}
                                    >
                                        <RightIcon />
                                    </div>
                                </div>
                            </ButtonBox>
                        </OptionalLink>
                    </div>
                </div>
            </div>

            {customPrayerInputShown && (
                <CustomPrayerInput
                    onClose={() => {
                        setCustomPrayerInputShown(false);
                    }}
                />
            )}
        </div>
    );
};
export default Services;
