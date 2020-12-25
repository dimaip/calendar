import React, { useContext, createContext } from 'react';
import { css } from 'emotion';
import { LangContext } from 'containers/Service/LangContext';
import useWindowSize from 'hooks/useWindowSize';
import zoomState from 'state/zoomState';
import { useRecoilValue } from 'recoil';

export const ZoomContext = createContext(null);

const Zoom = ({ children, isBibleParallel = false }) => {
    const [width] = useWindowSize();
    const { lang } = useContext(LangContext) || {};
    const isNestedZoom = useContext(ZoomContext);
    const originalZoom = useRecoilValue(zoomState);
    const zoom = isNestedZoom ? 1 : ((lang === 'parallel' || isBibleParallel) && width < 480 ? 0.8 : 1) * originalZoom;
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
