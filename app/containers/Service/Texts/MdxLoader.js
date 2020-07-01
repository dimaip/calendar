import React, { Suspense, useContext } from 'react';
import Loader from 'components/Loader/Loader';
import { css } from 'emotion';
import { LangContext } from '../useLangReducer';

const catchFailedImport = e => {
    console.warn('Loading mdx file failed', e);
    Sentry.captureException(e);
};

const MdxLoader = props => {
    let { lang, langA, langB } = useContext(LangContext);
    let { src } = props;
    if (lang === 'parallel') {
        const ComponentA = React.lazy(() => import(`containers/Service/Texts/${src}/${langA}.mdx`).catch(() => {}));
        const ComponentB = React.lazy(() => import(`containers/Service/Texts/${src}/${langB}.mdx`).catch(() => {}));
        return (
            <div
                className={css`
                    display: flex;
                    margin: 0 -12px;
                    min-width: ${lang === 'parallel' ? '468px' : '296px'};
                `}
            >
                <div
                    className={css`
                        width: 50%;
                        padding: 12px;
                    `}
                >
                    <Suspense fallback={<Loader width={32} />}>
                        <ComponentA {...props} />
                    </Suspense>
                </div>
                <div
                    className={css`
                        width: 50%;
                        padding: 12px;
                    `}
                >
                    <Suspense fallback={<Loader width={32} />}>
                        <ComponentB {...props} />
                    </Suspense>
                </div>
            </div>
        );
    }

    const Component = React.lazy(() =>
        import(`containers/Service/Texts/${src}/${lang || 'ru'}.mdx`).catch(catchFailedImport)
    );
    return (
        <Suspense fallback={<Loader width={32} />}>
            <Component {...props} />
        </Suspense>
    );
};

export default MdxLoader;
