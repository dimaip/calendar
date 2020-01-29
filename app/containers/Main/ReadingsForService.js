import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Link, useParams } from 'react-router-dom';
import { forEachObjIndexed } from 'ramda';
import ReadingGroup from './ReadingGroup';
import theme from '../../styles/theme';

const ReadingsForService = ({ title, readingsForService }) => {
    const rendredReadingGroups = [];
    forEachObjIndexed((value, key) => {
        rendredReadingGroups.push(<ReadingGroup title={String(key)} readingVerses={value} key={String(key)} />);
    }, readingsForService);

    const { date } = useParams();

    return (
        <Link to={`/date/${date}/readings/${title}`}>
            <div
                className={css`
                    border: 1px solid #d9dde5;
                    border-radius: 3px;
                    margin-bottom: 18px;
                    padding: 14px 12px;
                `}
            >
                <h2
                    className={css`
                        text-transform: uppercase;
                        font-size: 14px;
                        font-weight: bold;
                        color: ${theme.colors.primary};
                        margin-bottom: -4px;
                        display: flex;
                    `}
                >
                    <div
                        className={css`
                            flex-grow: 1;
                        `}
                    >
                        {title}
                    </div>

                    <div
                        className={css`
                            margin-top: 3px;
                        `}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.412" viewBox="0 0 19.412 15.864">
                            <g
                                fill="none"
                                stroke="#ae841a"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            >
                                <path d="M1 7.932h17l-7.205-6.519M18 7.932l-7.205 6.519" />
                            </g>
                        </svg>
                    </div>
                </h2>
                {rendredReadingGroups}
            </div>
        </Link>
    );
};
ReadingsForService.propTypes = {
    title: PropTypes.string.isRequired,
    readingsForService: PropTypes.object.isRequired,
};

export default ReadingsForService;
