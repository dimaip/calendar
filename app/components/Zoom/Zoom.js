import React, { useContext, createContext } from 'react';
import { css } from 'emotion';
import { useSelector } from 'react-redux';
import { LangContext } from 'containers/Service/useLangReducer';
import useWindowSize from 'hooks/useWindowSize';
import setZoomState from 'state/setZoomState';
import { useRecoilValue } from 'recoil';

export const ZoomContext = createContext(null);

const Zoom = ({ children, isBibleParallel = false }) => {
    const [width] = useWindowSize();
    const { lang } = useContext(LangContext) || {};
    const isNestedZoom = useContext(ZoomContext);
    const zoom = useRecoilValue(setZoomState);
    // const zoom = isNestedZoom
    //     ? 1
    //     : ((lang === 'parallel' || isBibleParallel) && width < 480 ? 0.8 : 1) *
    //       useSelector(state => state.settings.zoom);
    return (
        <div
            className={css`
                zoom: ${zoom};
            `}
        >
            <ZoomContext.Provider value={zoom}>{children}</ZoomContext.Provider>
        </div>
    );
};
export default Zoom;
