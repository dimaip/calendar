import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import SolidSection from 'components/SolidSection/SolidSection';

const ThisDayLink = ({ to, href, children }) => {
    if (href) {
        return (
            <a href={href} target="_blank">
                {children}
            </a>
        );
    }
    return <Link to={to}>{children}</Link>;
};

const ThisDays = ({ thisDays, date }) => {
    return thisDays?.length ? (
        <SolidSection paddingTop={24} paddingBottom={24}>
            {thisDays.map(thisDay => {
                return (
                    <ThisDayLink to={`/date/${date}/thisday/${thisDay.id}`} href={thisDay.link} key={thisDay.id}>
                        <div
                            className={css`
                                max-width: 640px;
                                background-color: #201f24;
                                display: flex;
                                border-radius: 8px;
                                overflow: hidden;
                                min-height: 200px;
                            `}
                        >
                            <div
                                className={css`
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    align-items: flex-start;
                                    padding: 12px;
                                    width: 66%;
                                `}
                            >
                                <div
                                    className={css`
                                        color: white;
                                        font-weight: bold;
                                        font-size: 20px;
                                        line-height: 1.2;
                                        flex-grow: 1;
                                    `}
                                >
                                    {thisDay.title}
                                </div>
                                <div
                                    className={css`
                                        color: white;
                                        font-size: 10px;
                                    `}
                                >
                                    в этот день
                                </div>
                            </div>
                            <div
                                className={css`
                                    background-image: url(${thisDay.image});
                                    background-size: cover;
                                    background-position: center;
                                    width: 100%;
                                `}
                            />
                        </div>
                    </ThisDayLink>
                );
            })}
        </SolidSection>
    ) : null;
};
export default ThisDays;
