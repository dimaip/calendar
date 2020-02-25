import React from 'react';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import { Link } from 'react-router-dom';

const ThisDayLink = ({ to, href, children }) => {
    if (href) {
        <a href={href} target="_blank">
            {children}
        </a>;
    }
    return <Link to={to}>{children}</Link>;
};

const ThisDays = ({ thisDays, date }) => {
    if (!thisDays) {
        return <Loader />;
    }

    return thisDays.length ? (
        <div>
            {thisDays.map(thisDay => {
                return (
                    <ThisDayLink to={`/date/${date}/thisday/${thisDay.id}`} href={thisDay.link} key={thisDay.id}>
                        <div
                            className={css`
                                max-width: 480px;
                            `}
                        >
                            <div
                                className={css`
                                    position: relative;
                                    width: 100%;
                                    padding-bottom: 56.5%;
                                `}
                            >
                                <div
                                    className={css`
                            background-image: url("${thisDay.image}");
                            background-position: center;
                            background-size: cover;
                            border-radius: 5px;
                            bottom: 0;
                            top: 0;
                            left: 0;
                            right: 0;
                            position: absolute;
                            padding: 12px;
                                    `}
                                >
                                    <h3
                                        className={css`
                                            color: white;
                                            font-weight: bold;
                                            text-shadow: -0.3px -0.3px 0 #000, 0.3px -0.3px 0 #000, -0.3px 0.3px 0 #000,
                                                0.3px 0.3px 0 #000;
                                        `}
                                    >
                                        {thisDay.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </ThisDayLink>
                );
            })}
        </div>
    ) : null;
};
export default ThisDays;
