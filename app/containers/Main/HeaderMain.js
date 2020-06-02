import React from 'react';
import { css } from 'emotion';

import Button from 'components/Button/Button';
import Burger from 'components/svgs/Burger';
import CalendarToggle from 'components/CalendarToggle/CalendarToggle';
import Header from 'components/Header/Header';
import DotsMenu from 'components/DotsMenu/DotsMenu';
import { useTheme } from 'emotion-theming';

const Today = ({ date, setNewDate }) => {
    const theme = useTheme();
    const todayDate = new Date();
    const todayDateString = todayDate.toISOString().slice(0, 10);
    if (date === todayDateString) {
        return null;
    }
    const setToday = () => setNewDate(todayDateString);
    return (
        <Button
            onClick={setToday}
            className={css`
                border: 1px solid ${theme.colours.primary};
                border-radius: 5px;
                font-size: 12px;
                color: ${theme.colours.primary};
                padding: 1px 4px 3px 4px !important;
                margin-right: 10px;
            `}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.646 6.582" width={8} height={6.09}>
                <path
                    d="M2.365 4.668a.352.352 0 10.492-.5L1.404 2.786H6.39a1.544 1.544 0 010 3.087.356.356 0 000 .712 2.256 2.256 0 000-4.512H1.377L2.861.603a.356.356 0 00-.5-.506l-2.1 2.068-.259.256z"
                    fill={theme.colours.primary}
                />
            </svg>{' '}
            сегодня
        </Button>
    );
};

const HeaderMain = ({ menuShown, setMenuShown, setNewDate, date, calendarRef }) => {
    return (
        <Header>
            <div
                className={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                `}
            >
                <div>
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
                    {setNewDate && (
                        <>
                            <Today date={date} setNewDate={setNewDate} />
                            <CalendarToggle calendarRef={calendarRef} date={date} setNewDate={setNewDate} iconOnly />
                        </>
                    )}
                    <DotsMenu />
                </div>
            </div>
        </Header>
    );
};
export default HeaderMain;
