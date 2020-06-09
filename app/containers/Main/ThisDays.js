import React, { useState } from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
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
            <div
                className={css`
                    margin: 0 -6px;
                `}
            >
                <SwipeableViews
                    enableMouseEvents
                    className={css`
                        padding: 0 12px !important;
                    `}
                    slideClassName={css`
                        padding: 0 4px !important;
                    `}
                >
                    {thisDays.map(thisDay => {
                        return (
                            <div
                                key={thisDay.id}
                                className={css`
                                    margin-bottom: 8px;
                                    padding: 0px;
                                `}
                            >
                                <ThisDayLink to={`/date/${date}/thisday/${thisDay.id}`} href={thisDay.link}>
                                    <div
                                        className={css`
                                            max-width: 640px;
                                            overflow: hidden;
                                        `}
                                    >
                                        <div
                                            className={css`
                                                position: relative;
                                                padding-bottom: 56.718%;
                                                height: 0;
                                                overflow: hidden;
                                                border-radius: 8px;
                                            `}
                                        >
                                            <img
                                                src={thisDay.image}
                                                alt={thisDay.title}
                                                className={css`
                                                    position: absolute;
                                                    top: 0;
                                                    left: 0;
                                                    width: 100%;
                                                    height: 100%;
                                                `}
                                            />
                                        </div>
                                        <h3
                                            className={css`
                                                margin-left: 8px;
                                                margin-right: 8px;
                                                margin-top: 8px;
                                            `}
                                        >
                                            {thisDay.title}
                                        </h3>
                                    </div>
                                </ThisDayLink>
                            </div>
                        );
                    })}
                </SwipeableViews>
            </div>
        </div>
    ) : null;
};
export default ThisDays;
