import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';
import RightIcon from 'components/svgs/RightIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import SolidSection from 'components/SolidSection/SolidSection';
import { getFeastInfo } from 'domain/getDayInfo';

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

    const services = [
        { title: 'Литургия Иоанна Златоуста', id: 'zlatoust', enabled: readings['Литургия'] && !vasiliy },
        { title: 'Литургия Василия Великого', id: 'vasiliy', enabled: readings['Литургия'] && vasiliy },
        { title: 'Литургия преждеосвященных даров', id: 'lpod', enabled: readings['Вечерня'] && lpod },
    ];

    return (
        <SolidSection>
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
                    Текст службы адаптируется под выбранную дату. Активны только те службы, которые служаться в этот
                    день
                </div>
            </div>
        </SolidSection>
    );
};
export default Services;
