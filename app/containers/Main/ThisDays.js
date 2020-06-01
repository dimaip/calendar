import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';

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
        <div
            className={css`
                padding-top: 0;
                padding-bottom: 12px;
                margin-left: -12px;
                margin-right: -12px;
            `}
        >
            <SectionHeading
                className={css`
                    padding-top: 0 !important;
                    padding-bottom: 12px;
                    padding-left: 12px;
                `}
            >
                В этот день
            </SectionHeading>
            {thisDays.map(thisDay => {
                return (
                    <div
                        key={thisDay.id}
                        className={css`
                            margin-bottom: 8px;
                        `}
                    >
                        <ThisDayLink to={`/date/${date}/thisday/${thisDay.id}`} href={thisDay.link}>
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
                                            line-height: 1.2;
                                            flex-grow: 1;
                                            margin-bottom: 6px;
                                            font-size: 18px;
                                        `}
                                    >
                                        {thisDay.title}
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
                    </div>
                );
            })}
        </div>
    ) : null;
};
export default ThisDays;
