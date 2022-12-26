import React, { useContext, useEffect, useState } from 'react';
import { css } from 'emotion';

import { LangContext } from '../LangContext';

const catchFailedImport = (e) => {
    console.warn('Loading mdx file failed', e);
    Sentry.captureException?.(e);
};

/**
 * The world is not without good people: https://twitter.com/JLarky/status/1585448425813725184
 */
const componentCache = new Map();

const LazyComponent = (props) => {
    const key = `${props.src}${props.lang || 'ru'}`
    const Component = componentCache.get(key);
    if (Component) {
        return <Component {...props} />;
    }
    throw import(`containers/Service/Texts/${props.src}/${props.lang || 'ru'}.mdx`)
        .then((x) => {
            componentCache.set(key, x.default);
        })
        .catch(catchFailedImport);
};

const MdxLoader = (props) => {
    const { lang, langA, langB } = useContext(LangContext);
    const langEffective = props.langOverride || lang;
    const { src } = props;
    if (langEffective === 'parallel') {
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
                        <LazyComponent {...props} src={src} lang={langA} />
                    </LangContext.Provider>
                </div>
                <div
                    className={css`
                        width: 50%;
                        padding: 12px;
                    `}
                >
                    <LangContext.Provider value={langStateB}>
                        <LazyComponent {...props} src={src} lang={langB} />
                    </LangContext.Provider>
                </div>
            </div>
        );
    }

    return <LazyComponent {...props} src={src} lang={langEffective} />;
};

export default MdxLoader;
