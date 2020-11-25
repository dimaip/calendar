import React from 'react';
const Loader = ({ width = 80 }) => (
    <svg
        style={{ margin: 'auto', background: 'transparent', display: 'block', shapeRendering: 'auto' }}
        width={width}
        height={width}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
    >
        <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#ae841a"
            strokeWidth="10"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
            transform="rotate(211.25 50 50)"
        >
            <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
            />
        </circle>
    </svg>
);

export default Loader;
