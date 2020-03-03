import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';
import RightIcon from 'components/svgs/RightIcon';

const Services = ({ date }) => {
    const theme = useTheme();

    const services = [{ title: 'Литургия Иоанна Златоуста', id: 'zlatoust' }];

    return (
        <>
            <SectionHeading>Богослужебные тексты</SectionHeading>
            <div
                className={css`
                    margin-top: 24px;
                `}
            >
                {services.map(service => (
                    <Link to={`/date/${date}/service/${service.id}`} key={service.id}>
                        <div
                            className={css`
                                border: 1px solid #d9dde5;
                                background-color: white;
                                border-radius: 8px;
                                margin-bottom: 18px;
                                padding: 14px 12px;
                            `}
                        >
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
                                            text-transform: uppercase;
                                            font-size: 14px;
                                            font-weight: bold;
                                            color: ${theme.colours.primary};
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
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};
export default Services;
