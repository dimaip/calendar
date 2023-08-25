import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const SwipeableLink = (props): JSX.Element => {
    const state = useRef({ x: 0 });
    const handleMouseDown = (e) => {
        state.current.x = e.screenX;
    };

    const handleClick = (e) => {
        const delta = Math.abs(e.screenX - state.current.x);

        if (delta > 10) {
            e.preventDefault();
        } else if (props.onClick) {
            props.onClick(e);
        }
    };
    return <Link {...props} onMouseDown={handleMouseDown} onClick={handleClick} />;
};

export default SwipeableLink;
