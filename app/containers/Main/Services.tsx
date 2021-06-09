import React, { useContext } from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Link, useHistory } from 'react-router-dom';
import RightIcon from 'components/svgs/RightIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import makeServices from 'containers/Service/Texts/Texts';
import groupBy from 'lodash.groupby';
import { useAuth0 } from '@auth0/auth0-react';
import Lock from 'components/svgs/Lock';
import { useSubscriptionService } from 'stateMachines/subscription';

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
    const [state, send] = useSubscriptionService();
    const locked = true;
    const theme = useTheme();
    const history = useHistory();

    const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

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
            {isLoading ? (
                'Loading'
            ) : isAuthenticated ? (
                <div>
                    Hello {user.name} <button onClick={async () => logout()}>Log Out</button>
                </div>
            ) : (
                <button onClick={async () => loginWithRedirect()}>Log In</button>
            )}

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
                                    // <OptionalLink
                                    //     enabled={service.enabled}
                                    //     className={css`
                                    //         cursor: ${service.enabled ? 'pointer' : 'arrow'};
                                    //         user-select: none;
                                    //     `}
                                    //     to={{
                                    //         pathname: `/date/${date}/service/${service.id}`,
                                    //         state: {
                                    //             backLink: location.pathname,
                                    //         },
                                    //     }}
                                    //     key={service.id}
                                    // >
                                    <ButtonBox
                                        key={service.id}
                                        onClick={() => {
                                            history.push(`/date/${date}/service/${service.id}`);
                                            send({
                                                type: 'CHOOSE_BOOK',
                                                serviceId: service.id,
                                            });
                                        }}
                                    >
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
                                                {service.subscriptions ? <Lock /> : <RightIcon />}
                                            </div>
                                        </div>
                                    </ButtonBox>
                                    // </OptionalLink>
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
