import React from 'react';
import s from './Button.scss';

const Button = (props) => <button {...{...{className: s.root}, ...props}}>{props.children}</button>;
Button.propTypes = {
  children: React.PropTypes.object
};

export default Button;
