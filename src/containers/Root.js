import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import 'styles/reset.css';
import s from './Root.scss';
import Logo from 'components/Logo';

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.object
  };
  render() {
    return (
      <div>
        <header className={s.root}>
          <Link to='/' title='На главную'>
            <Logo className={s.logo} />
          </Link>
          <a href='http://psmb.ru' title='Перейти на сайт Преображенского братства'>
            <div className={s.title}>
              Православный<br />
              календарь
            </div>
          </a>
        </header>
        {this.props.children}
        <footer>c.psmb.ru</footer>
      </div>
    );
  }
}
