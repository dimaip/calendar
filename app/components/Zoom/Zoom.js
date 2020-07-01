import React, { useLayoutEffect, useState, useContext } from 'react';
import { css } from 'emotion';
import { useSelector } from 'react-redux';
import { LangContext } from 'containers/Service/useLangReducer';

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const Zoom = ({ children }) => {
    const [width] = useWindowSize();
    const { lang } = useContext(LangContext) || {};
    const zoom = (lang === 'parallel' && width < 480 ? 0.8 : 1) * useSelector(state => state.settings.zoom);
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
