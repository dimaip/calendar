import React from 'react';
import { css } from 'emotion';
import { useSelector } from 'react-redux';

const Zoom = ({ children }) => {
    const zoom = useSelector(state => state.settings.zoom);
    return (
        <div
            className={css`
                zoom: ${zoom};
            `}
        >
            {children}
        </div>
    );
};
export default Zoom;
