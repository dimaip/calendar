import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

import CalendarIcon from 'components/svgs/CalendarIcon';
import Button from 'components/Button/Button';
import Cross from 'components/svgs/Cross';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Star from '../svgs/Star';

const Header = ({ handleToggleClick, calendarShown }) => {
    return (
        <header
            className={css`
                position: relative;
                display: flex;
                height: 44px;
                flex-shrink: 0;
                align-items: center;
                border-bottom: 1px solid #ccc;
            `}
        >
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                <Link
                    to="/"
                    title="На главную"
                    className={css`
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    `}
                >
                    <Star />
                </Link>
            </div>
            <div
                className={css`
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `}
            >
                <div>
                    <ZoomControlToggle />
                </div>
                {handleToggleClick && (
                    <Button
                        onClick={handleToggleClick}
                        className={css`
                            display: block;
                            padding: 10px 18px;
                        `}
                    >
                        {calendarShown ? <Cross /> : <CalendarIcon />}
                    </Button>
                )}
            </div>
        </header>
    );
};
export default Header;
