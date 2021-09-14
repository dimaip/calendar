import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Link, useLocation } from 'react-router-dom';
import RightIcon from 'components/svgs/RightIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import makeServices from 'containers/Service/Texts/Texts';
import groupBy from 'lodash.groupby';

import SectionHeading from './SectionHeading';

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

    const location = useLocation();

    const services = makeServices(date, readings);

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
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Services;
