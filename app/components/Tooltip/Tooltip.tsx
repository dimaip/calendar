import React from 'react';
import { Tooltip as Tippy } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
const Tooltip = ({ children }) => (
    <Tippy html={children} arrow tag="span" style={{ marginLeft: 5 }}>
        <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: 'rgb(130, 148, 158)', verticalAlign: '-10%' }}>
            <g>
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path>
            </g>
        </svg>
    </Tippy>
);

export default Tooltip;
