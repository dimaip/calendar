import { getFeastInfo } from 'domain/getDayInfo';

import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Link, useParams, useLocation } from 'react-router-dom';
import forEach from 'lodash.foreach';
import { useTheme } from 'emotion-theming';
import RightIcon from 'components/svgs/RightIcon';
import ButtonBox from 'components/ButtonBox/ButtonBox';

import ReadingGroup from './ReadingGroup';

const ReadingsForService = ({ title, readingsForService, brother }) => {
    const rendredReadingGroups = [];
    forEach(readingsForService, (value, key) => {
        rendredReadingGroups.push(<ReadingGroup title={String(key)} readingVerses={value} key={String(key)} />);
    });

    const { date } = useParams();
    const theme = useTheme();

    let to;
    let effectiveTitle = title;
    const { vasiliy, lpod } = getFeastInfo(new Date(date));
    const location = useLocation();
    if (title === 'Литургия') {
        to = {
            pathname: `/date/${date}/readings/Литургия`,
            state: { backLink: location.pathname, scrollToReadings: true },
        };
        effectiveTitle += ` ${vasiliy ? 'Василия Великого' : 'Иоанна Златоуста'}`;
    } else if (title === 'Вечерня' && lpod) {
        to = {
            pathname: `/date/${date}/readings/Вечерня`,
            state: { backLink: location.pathname, scrollToReadings: true },
        };
        effectiveTitle = 'Литургия преждеосвященных даров';
    } else if (brother) {
        to = `/date/${date}/bReadings/${title}`;
    } else {
        to = {
            pathname: `/date/${date}/readings/${title}`,
            state: {
                backLink: location.pathname,
            },
        };
    }

    return (
        <Link to={to}>
            <ButtonBox>
                <h2
                    className={css`
                        text-transform: uppercase;
                        font-size: 14px;
                        font-weight: bold;
                        color: ${theme.colours.primary};
                        margin-bottom: -4px;
                        display: flex;
                    `}
                >
                    <div
                        className={css`
                            flex-grow: 1;
                        `}
                    >
                        {effectiveTitle}
                    </div>

                    <div
                        className={css`
                            margin-top: 3px;
                        `}
                    >
                        <RightIcon />
                    </div>
                </h2>
                {rendredReadingGroups}
            </ButtonBox>
        </Link>
    );
};
ReadingsForService.propTypes = {
    title: PropTypes.string.isRequired,
    readingsForService: PropTypes.object.isRequired,
};

export default ReadingsForService;
