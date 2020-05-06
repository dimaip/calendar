import React, { Suspense } from 'react';
import Loader from 'components/Loader/Loader';

const reloadOnFailedImport = e => {
    console.warn('Loading mdx file failed', e);
    Sentry.captureException(e);
};

const MdxLoader = props => {
    let { lang, src } = props;
    lang = lang === 'default' ? 'ru' : lang;
    lang = lang === 'ЦСЯ' ? 'csj' : lang;
    const Component = React.lazy(() =>
        import(`containers/Service/Texts/${src}.${lang}.mdx`).catch(reloadOnFailedImport)
    );
    return (
        <Suspense fallback={Loader}>
            <Component {...props} />
        </Suspense>
    );
};

export default MdxLoader;
