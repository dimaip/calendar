import LayoutInner from 'components/LayoutInner/LayoutInner';
import Loader from 'components/Loader/Loader';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import ErrorMessage404 from 'components/ErrorMessage404/ErrorMessage404';
import useHymns from 'hooks/useHymns';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Zoom from 'components/Zoom/Zoom';
import RteText from 'components/RteText/RteText';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import LanguageSwitcher from 'containers/Service/LanguageSwitcher';
import { LangContext } from 'containers/Service/LangContext';

import { FavButton } from './FavButton';

const HymnInner = () => {
    // @TODO loader
    const { data: hymns, status } = useHymns();
    const { lang, langA, langB } = useContext(LangContext);

    const { hymnId } = useParams<{ hymnId: string }>();
    const hymn = hymns?.find((h) => h.id === hymnId);

    if (lang === 'parallel') {
        const langStateA = { lang: langA, langA, langB };
        const langStateB = { lang: langB, langA, langB };
        return (
            <div
                className={css`
                    display: flex;
                    margin: 0 -12px;
                `}
            >
                <div
                    className={css`
                        width: 50%;
                        padding: 12px;
                    `}
                >
                    <LangContext.Provider value={langStateA}>
                        <RteText html={hymn.bodytext[langA]} />
                    </LangContext.Provider>
                </div>
                <div
                    className={css`
                        width: 50%;
                        padding: 12px;
                    `}
                >
                    <LangContext.Provider value={langStateB}>
                        <RteText html={hymn.bodytext[langB]} />
                    </LangContext.Provider>
                </div>
            </div>
        );
    }
    return <RteText html={hymn.bodytext[lang]} />;
};

export const Hymn = () => {
    const theme = useTheme();
    const { data: hymns, status } = useHymns();
    const { hymnId } = useParams<{ hymnId: string }>();
    const hymn = hymns?.find((h) => h.id === hymnId);

    return (
        <LayoutInner backLink="/hymns" left={<LanguageSwitcher />}>
            {status === 'loading' ? (
                <Loader />
            ) : status === 'error' ? (
                <ErrorMessage500 />
            ) : !hymn ? (
                <ErrorMessage404 />
            ) : (
                <>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 12,
                        }}
                    >
                        <h3
                            className={css`
                                color: ${theme.colours.primary};
                                font-size: 30px;
                            `}
                        >
                            {hymn.title}
                        </h3>
                        <FavButton hymnId={hymnId} />
                    </div>
                    <Zoom>
                        <HymnInner />
                    </Zoom>
                </>
            )}
        </LayoutInner>
    );
};
