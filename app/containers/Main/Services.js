import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';
import RightIcon from 'components/svgs/RightIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import SolidSection from 'components/SolidSection/SolidSection';

const Services = ({ date }) => {
    const theme = useTheme();

    const services = [
        { title: 'Литургия Иоанна Златоуста', id: 'zlatoust' },
        { title: 'Литургия Василия Великого', id: 'vasiliy' },
        { title: 'Литургия преждеосвященных даров', id: 'lpod' },
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
                        <Link to={`/date/${date}/service/${service.id}`} key={service.id}>
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
                        </Link>
                    ))}
                </div>
            </div>
        </SolidSection>
    );
};
export default Services;
