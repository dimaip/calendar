import React, { useContext, useEffect } from 'react';
import { SwipeableViewsContext } from 'react-swipeable-views';

interface SwipeableViewsContextValue {
    slideUpdateHeight?: () => void;
}

export const HeightUpdater = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const context = useContext(
        SwipeableViewsContext as unknown as React.Context<SwipeableViewsContextValue | undefined>
    );
    useEffect(() => {
        const updateHeight = context?.slideUpdateHeight;
        if (!updateHeight) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            updateHeight();
        }, 30);
        return () => {
            window.clearTimeout(timer);
        };
    });
    return <>{children}</>;
};
