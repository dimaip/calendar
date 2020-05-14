import React, { forwardRef } from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

import Button from 'components/Button/Button';
import Burger from 'components/svgs/Burger';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Star from '../../components/svgs/Star';
import CalendarToggle from 'components/CalendarToggle/CalendarToggle';
import Header from 'components/Header/Header';

const HeaderMain = ({ menuShown, setMenuShown, setNewDate, date, calendarRef }) => {
    return (
        <Header>
            {setMenuShown && (
                <Button
                    title="Меню"
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
                    height: 100%;
                `}
            >
                <div>
                    <ZoomControlToggle />
                </div>
                {setNewDate && (
                    <CalendarToggle calendarRef={calendarRef} date={date} setNewDate={setNewDate} iconOnly />
                )}
            </div>
        </Header>
    );
};
export default HeaderMain;
