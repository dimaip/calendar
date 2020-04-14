import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

import CalendarIcon from 'components/svgs/CalendarIcon';
import Button from 'components/Button/Button';
import Cross from 'components/svgs/Cross';
import Burger from 'components/svgs/Burger';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Star from '../svgs/Star';

const Header = ({ handleToggleClick, calendarShown, menuShown, setMenuShown }) => {
    return (
        <div
            className={css`
                height: 44px;
                user-select: none;
            `}
        >
            <header
                className={css`
                    position: fixed;
                    z-index: 1;
                    left: 0;
                    right: 0;
                    background-color: white;
                    display: flex;
                    height: 44px;
                    flex-shrink: 0;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                `}
            >
                {setMenuShown && (
                    <Button
                        onClick={() => setMenuShown(!menuShown)}
                        className={css`
                            display: block;
                            padding: 10px 18px;
                            z-index: 1;
                        `}
                    >
                        <Burger />
                    </Button>
                )}
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
        </div>
    );
};
export default Header;
