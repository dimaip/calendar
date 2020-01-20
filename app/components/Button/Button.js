import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.scss';

const Button = props => <button {...{ ...{ className: s.root }, ...props }}>{props.children}</button>;
Button.propTypes = {
    children: PropTypes.object,
};

export default Button;
