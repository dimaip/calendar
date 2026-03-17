import React from 'react';
import { css } from 'emotion';

const Banner = () => (
    <a
        href="https://vkvideo.ru/@rus_molitva"
        target="_blank"
        className={css`
            display: block;
            height: 80px;
            background-image: url('/assets/icons/hands.svg');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: right;
            background-color: #aa945f;
            color: white;
            border-radius: 8px;
            padding: 14px 12px;
            margin: 0 -10px 0 -10px;
        `}
    >
        <div className={css``}>
            Трансляция богослужений
            <br />
            на русском языке
        </div>
    </a>
);
export default Banner;
