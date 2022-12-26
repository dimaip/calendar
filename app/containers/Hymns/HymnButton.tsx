import ButtonBox from 'components/ButtonBox/ButtonBox';
import { css } from 'emotion';
import { Hymn } from 'hooks/useHymns';
import React from 'react';
import { Link } from 'react-router-dom';

import { FavButton } from './FavButton';

export const HymnButton = ({ hymn }: { hymn: Hymn }) => {
    return (
        <Link
            className={css`
                cursor: ${'pointer'};
                user-select: none;
            `}
            to={{
                pathname: `/hymns/${hymn.id}`,
                state: {
                    backLink: location.pathname,
                },
            }}
        >
            <ButtonBox>
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <div
                        className={css`
                            flex-grow: 1;
                            flex-shrink: 1;
                        `}
                    >
                        <p>{hymn.title}</p>
                    </div>
                    <FavButton hymnId={hymn.id} />
                </div>
            </ButtonBox>
        </Link>
    );
};
