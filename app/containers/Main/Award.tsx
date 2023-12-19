import React from 'react';
import { css } from 'emotion';
import TagManager from 'react-gtm-module';
import { HeightUpdater } from 'components/HeightUpdate/HeightUpdater';

const Award = (): JSX.Element => {
    return (
        <HeightUpdater>
            <a
                href="https://premiavmeste.ru/participation"
                target="_blank"
                title="Открыт сбор заявок"
                className={css`
                    display: block;
                    margin: 0 -10px 8px -10px;
                `}
                onClick={() =>
                    TagManager.dataLayer({
                        dataLayer: {
                            event: 'AwardsFollow',
                        },
                    })
                }
            >
                <img
                    src="/assets/award.svg"
                    className={css`
                        display: block;
                        border-radius: 8px;
                    `}
                />
            </a>
        </HeightUpdater>
    );
};
export default Award;
