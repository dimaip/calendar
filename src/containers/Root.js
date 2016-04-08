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
        <header>
          <Link to='/' title='На главную' className={s.root}>
            <Logo className={s.logo} />
            <div className={s.title}>
              Православный<br />
              календарь
            </div>
          </Link>
        </header>
        {this.props.children}
        <footer>c.psmb.ru</footer>
      </div>
    );
  }
}
