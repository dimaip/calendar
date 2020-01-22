import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

import BurgerIcon from 'components/BurgerIcon/BurgerIcon.js';
import CalendarIcon from 'components/CalendarIcon/CalendarIcon.js';

const Header = () => (
    <header
        className={css`
            height: 60px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            border-bottom: 1px solid #ccc;
        `}
    >
        <div
            className={css`
                padding-left: 18px;
                padding-right: 18px;
            `}
        >
            <BurgerIcon />
        </div>
        <Link
            to="/"
            title="На главную"
            className={css`
                flex-grow: 1;
            `}
        ></Link>
        <div
            className={css`
                padding: 10px 18px;
            `}
        >
            <CalendarIcon />
        </div>
    </header>
);
export default Header;
