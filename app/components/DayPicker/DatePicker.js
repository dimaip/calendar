import React from 'react';
import DP from 'react-day-picker';
import './DayPicker.css'; //TODO css without modules is bad practice

const DayPicker = props => (
    <DP {...props}/>
    );

export default DayPicker;
