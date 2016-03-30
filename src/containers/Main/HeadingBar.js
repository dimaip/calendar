import React from 'react';
import s from './HeadingBar.scss';

const HeadingBar = ({title, subTitle}) => (
  <div className={s.root}>
    <h2 className={s.title}>{title}</h2>
    <div className={s.subTitle}>{subTitle}</div>
  </div>
);
export default HeadingBar;
