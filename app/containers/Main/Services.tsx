import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Link, useLocation } from 'react-router-dom';
import RightIcon from 'components/svgs/RightIcon';
import TrashIcon from 'components/svgs/TrashIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import useServices from 'containers/Service/Texts/Texts';
import groupBy from 'lodash.groupby';
import customPrayersState from 'state/customPrayersState';
import { useRecoilState } from 'recoil';
import PlusIcon from 'components/svgs/PlusIcon';
import CustomPrayerInput from 'components/CustomPrayers/CustomPrayerInput';
import customPrayerInputState from 'state/customPrayerInputState';

import SectionHeading from './SectionHeading';

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
    const theme = useTheme();

    const location = useLocation();

    const services = useServices(date, readings);

    const [_inputText, setInputText] = useRecoilState(customPrayerInputState);
    const [customPrayers, setCustomPrayers] = useRecoilState(customPrayersState('Sugubaja'));

    const groupedServices = groupBy(services, (service) => service.group);

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
            {Object.keys(groupedServices).map((groupTitle) => {
                const servicesForGroup = groupedServices[groupTitle];
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
                                                {service.customPrayerId ? (
                                                    <div
                                                        className={css`
                                                            flex-grow: 0;
                                                            flex-shrink: 0;
                                                        `}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setCustomPrayers(customPrayers.filter(i => i.id !== service.customPrayerId));
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
                                    <ButtonBox onClick={() => setInputText('')}>
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
            <CustomPrayerInput />
        </div>
    );
};
export default Services;
