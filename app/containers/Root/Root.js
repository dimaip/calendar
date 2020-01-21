import React, { PureComponent } from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Main from '../../components/Main/Main.js';
import '../../styles/reset.css';
import BurgerIcon from '../../components/BurgerIcon/BurgerIcon.js';
import CalendarIcon from '../../components/CalendarIcon/CalendarIcon.js';
import Logo from '../../components/Logo/Logo.js';

export default class Root extends PureComponent {
    static propTypes = {
        children: PropTypes.object,
    };
    render() {
        return (
            <div>
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
                <Main />
                <footer>c.psmb.ru</footer>
            </div>
        );
    }
}
