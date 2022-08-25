import React, { useContext, useEffect } from 'react';
import { SwipeableViewsContext } from 'react-swipeable-views';

export const HeightUpdater = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const context = useContext(SwipeableViewsContext);
    useEffect(() => {
        context.slideUpdateHeight();
    });
    return <>{children}</>;
};
