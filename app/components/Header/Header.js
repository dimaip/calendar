import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

import CalendarIcon from 'components/CalendarIcon/CalendarIcon.js';
import Button from 'components/Button/Button';

const Header = ({ handleToggleClick, calendarShown }) => (
    <header
        className={css`
            height: 60px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            border-bottom: 1px solid #ccc;
        `}
    >
        <Link
            to="/"
            title="На главную"
            className={css`
                flex-grow: 1;
            `}
        ></Link>
        {handleToggleClick && (
            <Button
                onClick={handleToggleClick}
                className={css`
                    padding: 10px 18px;
                `}
            >
                {calendarShown ? (
                    <div
                        className={css`
                            margin-top: 6px;
                            margin-right: -10px;
                        `}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="45.828"
                            height="45.828"
                            viewBox="0 0 45.828 45.828"
                        >
                            <g transform="translate(-322.586 -7.586)">
                                <g transform="translate(324 9)">
                                    <path
                                        d="M15.2,0A15.2,15.2,0,1,1,0,15.2,15.2,15.2,0,0,1,15.2,0Z"
                                        transform="translate(0 21.5) rotate(-45)"
                                        fill="none"
                                        stroke="#201f24"
                                        strokeWidth="2"
                                    />
                                </g>
                                <g transform="translate(339.732 24.732)">
                                    <line
                                        x1="12.585"
                                        y2="12.585"
                                        transform="translate(0)"
                                        fill="none"
                                        stroke="#201f24"
                                        strokeWidth="2"
                                    />
                                    <line
                                        x2="12.585"
                                        y2="12.585"
                                        transform="translate(0)"
                                        fill="none"
                                        stroke="#201f24"
                                        strokeWidth="2"
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
                ) : (
                    <CalendarIcon />
                )}
            </Button>
        )}
    </header>
);
export default Header;
