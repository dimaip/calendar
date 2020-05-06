import React from 'react';

const reloadOnFailedImport = e => {
    console.warn('Imported asset not available, probably time to re-deploy', e);
    Sentry.captureException(e);
    location.reload();
};

const MdxLoader = props => {
    let { lang, path } = props;
    lang = lang === 'default' ? 'ru' : lang;
    lang = lang === 'ЦСЯ' ? 'csj' : lang;
    const Component = React.lazy(() =>
        import(`containers/Service/Texts/${path}.${lang}.mdx`).catch(reloadOnFailedImport)
    );
    return <Component {...props} />;
};

export default MdxLoader;
