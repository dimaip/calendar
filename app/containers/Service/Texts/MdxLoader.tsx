import React, { useContext } from 'react';
import { css } from 'emotion';

import { LangContext } from '../LangContext';

const catchFailedImport = (e) => {
    console.warn('Loading mdx file failed', e);
    Sentry.captureException?.(e);
};

const MdxLoader = (props) => {
    const { lang, langA, langB } = useContext(LangContext);
    const langEffective = props.langOverride || lang;
    const { src } = props;
    if (langEffective === 'parallel') {
        const ComponentA = React.lazy(() => import(`containers/Service/Texts/${src}/${langA}.mdx`).catch(() => {}));
        const ComponentB = React.lazy(() => import(`containers/Service/Texts/${src}/${langB}.mdx`).catch(() => {}));
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
                        <ComponentA {...props} />
                    </LangContext.Provider>
                </div>
                <div
                    className={css`
                        width: 50%;
                        padding: 12px;
                    `}
                >
                    <LangContext.Provider value={langStateB}>
                        <ComponentB {...props} />
                    </LangContext.Provider>
                </div>
            </div>
        );
    }

    const Component = React.lazy(() =>
        import(`containers/Service/Texts/${src}/${langEffective || 'ru'}.mdx`).catch(catchFailedImport)
    );
    return <Component {...props} />;
};

export default MdxLoader;
