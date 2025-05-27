import React from 'react';
import { css } from 'emotion';
import SwipeableViews from 'react-swipeable-views';

import SectionHeading from './SectionHeading';
import { SermonSmall } from 'components/SermonSmall/SermonSmall';

const Sermons = React.memo(({ sermons, hideTitle = false }) => {
    return sermons?.length ? (
        <>
            {!hideTitle && (
                <SectionHeading
                    className={css`
                        padding-top: 0 !important;
                    `}
                >
                    Проповедь
                </SectionHeading>
            )}
            <div
                className={css`
                    margin: 0 -18px 18px -18px;
                `}
            >
                <SwipeableViews
                    enableMouseEvents
                    className={css`
                        padding: 0 96px 0 4px !important;
                    `}
                    slideClassName={css`
                        padding: 0 6px !important;
                    `}
                >
                    {sermons.map((sermon) => (
                        <SermonSmall key={sermon.id} sermon={sermon} />
                    ))}
                </SwipeableViews>
            </div>
        </>
    ) : null;
});
export default Sermons;
