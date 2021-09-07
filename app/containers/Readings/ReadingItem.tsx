import React, { useContext } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { LangContext } from 'containers/Service/LangContext';
import { ZoomContext } from 'components/Zoom/Zoom';
import { useRecoilState } from 'recoil';
import isParallelState from 'state/isParallel';

import ReadingItemSingle from './ReadingItemSingle';

const ReadingItem = ({ type, readingVerse }) => {
    const langState = useContext(LangContext);
    const zoom = useContext(ZoomContext);
    const [isParallel, setIsParallel] = useRecoilState(isParallelState);
    const toggleParallel = (): void => setIsParallel(!isParallel);
    const theme = useTheme();

    return (
        <>
            <div
                className={css`
                    position: sticky;
                    top: ${49 / (zoom || 1)}px;
                    left: 0;
                    right: 0;
                    padding: 20px 0 0 0;
                    background-color: ${theme.colours.white};
                    z-index: 3;
                    /* box-shadow: 0px 0px 3px #bbb; */
                `}
            >
                {type !== 'unnamed' && (
                    <div
                        className={css`
                            font-size: 16px;
                            color: ${theme.colours.gray};
                        `}
                    >
                        {type}
                    </div>
                )}
                <div
                    className={css`
                        font-size: 18px;
                        font-weight: bold;
                        color: ${theme.colours.darkGray};
                        line-height: 1.5;
                    `}
                >
                    {readingVerse.replace('@', '')}
                </div>
            </div>
            {isParallel ? (
                <div
                    className={css`
                        display: flex;
                        margin: 0 -12px;
                    `}
                >
                    <div
                        className={css`
                            width: 50%;
                            padding: 0 12px;
                        `}
                    >
                        <ReadingItemSingle
                            key={readingVerse}
                            type={type}
                            readingVerse={readingVerse}
                            defaultTranslation={langState?.langA === 'csj' ? '91Slavic' : 'default'}
                            isParallel={isParallel}
                        />
                    </div>
                    <div
                        className={css`
                            width: 50%;
                            padding: 0 12px;
                        `}
                    >
                        <ReadingItemSingle
                            key={readingVerse}
                            type={type}
                            readingVerse={readingVerse}
                            defaultTranslation={langState?.langB === 'csj' ? '91Slavic' : 'default'}
                            isParallel={isParallel}
                            toggleParallel={toggleParallel}
                        />
                    </div>
                </div>
            ) : (
                <ReadingItemSingle
                    key={readingVerse}
                    type={type}
                    readingVerse={readingVerse}
                    defaultTranslation={langState?.lang === 'csj' ? '91Slavic' : 'default'}
                    toggleParallel={toggleParallel}
                    isParallel={isParallel}
                />
            )}
        </>
    );
};

export default ReadingItem;
