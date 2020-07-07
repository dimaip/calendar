import React from 'react';

const Cross = ({ white = false }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18.29 19.89"
        width="10"
        style={{ marginTop: 3, marginLeft: 5 }}
    >
        <path
            d="M17.29 1L1 18.89M1 1l16.29 17.89"
            fill="none"
            stroke={white ? '#ffffff' : '#201f24'}
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
        />
    </svg>
);

export default Cross;
