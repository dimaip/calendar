import React, { useContext, createContext } from 'react';
import { css } from 'emotion';
import useWindowSize from 'hooks/useWindowSize';
import zoomState from 'state/zoomState';
import { useRecoilValue } from 'recoil';
import isParallelState from 'state/isParallel';

export const ZoomContext = createContext(null);

const Zoom = ({ children }) => {
    const [width] = useWindowSize();
    const isNestedZoom = useContext(ZoomContext);
    const originalZoom = useRecoilValue(zoomState);
    const isParallel = useRecoilValue(isParallelState);
    const zoom = isNestedZoom ? 1 : (isParallel && width < 480 ? 0.8 : 1) * originalZoom;
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
