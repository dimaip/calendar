import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';
import RightIcon from 'components/svgs/RightIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import SolidSection from 'components/SolidSection/SolidSection';
import { getFeastInfo, calculateEasterDate } from 'domain/getDayInfo';

const OptionalLink = ({ enabled, ...rest }) =>
    enabled ? (
        // @ts-ignore
        <Link {...rest} />
    ) : (
        <span title="Данная служба в этот день не совершается" className={rest.className}>
            {rest.children}
        </span>
    );

const Services = ({ date, readings }) => {
    const theme = useTheme();

    const { vasiliy, lpod } = getFeastInfo(new Date(date));

    const _dateObj = new Date(date);
    const y = _dateObj.getFullYear();
    const m = _dateObj.getMonth();
    const d = _dateObj.getDate();
    const dateObj = new Date(y, m, d);

    const easter = calculateEasterDate(y);
    const easterAnd1Week = calculateEasterDate(y);
    easterAnd1Week.setDate(easterAnd1Week.getDate() + 7);

    const services = [
        { title: 'Литургия Иоанна Златоуста', id: 'zlatoust', enabled: readings['Литургия'] && !vasiliy },
        { title: 'Литургия Василия Великого', id: 'vasiliy', enabled: readings['Литургия'] && vasiliy },
        { title: 'Литургия преждеосвященных даров', id: 'lpod', enabled: readings['Вечерня'] && lpod },
        { title: 'Пасхальные часы', id: 'easterHours', enabled: easter <= dateObj && dateObj <= easterAnd1Week },
        { title: 'Благодарственные молитвы', id: 'blagodarstvennie', enabled: true },
        { title: 'Покаянный канон', id: 'pokajanni', enabled: true },
    ];

    return (
        <div
            className={css`
                background: ${theme.colours.bgGray};
                padding: 0 18px 0 18px;
                margin: 0 -18px 0 -18px;
            `}
        >
            <SectionHeading>Богослужебные тексты</SectionHeading>
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
                    {services.map(service => (
                        <OptionalLink
                            enabled={service.enabled}
                            className={css`
                                cursor: ${service.enabled ? 'pointer' : 'arrow'};
                                user-select: none;
                            `}
                            to={`/date/${date}/service/${service.id}`}
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
                    ))}
                </div>
                <div
                    className={css`
                        font-size: 14px;
                        color: ${theme.colours.gray};
                        margin-top: 12px;
                        margin-bottom: 24px;
                    `}
                >
                    Текст службы адаптируется под выбранную дату. Активны только те службы, которые служатся в этот день
                </div>
            </div>
        </div>
    );
};
export default Services;
