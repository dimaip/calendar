import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Main from '../../components/Main/Main.js';
import '../../styles/reset.css';
import s from './Root.scss';
import Logo from '../../components/Logo/Logo.js';

export default class Root extends PureComponent {
    static propTypes = {
        children: PropTypes.object,
    };
    render() {
        return (
            <div>
                <header>
                    <Link to="/" title="На главную" className={s.root}>
                        <Logo className={s.logo} />
                        <div className={s.title}>
                            Православный
                            <br />
                            календарь
                        </div>
                    </Link>
                </header>
                <Main />
                <footer>c.psmb.ru</footer>
            </div>
        );
    }
}
