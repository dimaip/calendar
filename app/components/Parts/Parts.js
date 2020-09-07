import React, { useContext } from 'react';
import { css } from 'emotion';
import useParts from 'hooks/useParts';
import RteText from 'components/RteText/RteText';
import { LangContext } from 'containers/Service/useLangReducer';

const objAccess = (object, path) => path.split('.').reduce((acc, curr) => acc?.[curr], object);

const PartRenderer = ({ date, lang, partNames, fallback, alwaysShowFallback, Layout }) => {
    const { data: parts } = useParts(date, lang);
    let texts = partNames.map(partName => objAccess(parts, partName) || []).flatten();
    if (!texts?.length) {
        return fallback ? <Layout>{fallback}</Layout> : null;
    }

    const exclusiveTexts = texts.filter(text => text.includes('ЗАМЕНА')).map(text => text.replace('ЗАМЕНА', ''));
    texts = exclusiveTexts.length ? exclusiveTexts : texts;

    return (
        <Layout>
            <div>
                {alwaysShowFallback && !exclusiveTexts.length && fallback}
                {texts?.map?.((text, index) => (
                    <RteText
                        key={index}
                        html={text}
                        className={css`
                            margin-bottom: 12px;

                            & ._-ОСНОВНОЙ_Основной-отст1-5 {
                                text-indent: 0;
                                margin-left: 0;
                            }
                        `}
                    />
                ))}
            </div>
        </Layout>
    );
};

const Parts = ({
    date,
    partNames,
    fallback = null,
    alwaysShowFallback = false,
    Layout = ({ children }) => children,
}) => {
    const { lang, langA, langB } = useContext(LangContext);
    if (lang === 'parallel') {
        const langStateA = { lang: langA, langA, langB };
        const langStateB = { lang: langB, langA, langB };
        return (
            <div
                className={css`
                    display: flex;
                    margin: 0 -12px;
                    min-width: ${lang === 'parallel' ? '444px' : '296px'};
                `}
            >
                <div
                    className={css`
                        width: 50%;
                        padding: 12px;
                    `}
                >
                    <LangContext.Provider value={langStateA}>
                        <PartRenderer
                            fallback={fallback}
                            alwaysShowFallback={alwaysShowFallback}
                            date={date}
                            partNames={partNames}
                            Layout={Layout}
                            lang={langA}
                        />
                    </LangContext.Provider>
                </div>
                <div
                    className={css`
                        width: 50%;
                        padding: 12px;
                    `}
                >
                    <LangContext.Provider value={langStateB}>
                        <PartRenderer
                            fallback={fallback}
                            alwaysShowFallback={alwaysShowFallback}
                            date={date}
                            partNames={partNames}
                            Layout={Layout}
                            lang={langB}
                        />
                    </LangContext.Provider>
                </div>
            </div>
        );
    }

    return (
        <PartRenderer
            fallback={fallback}
            alwaysShowFallback={alwaysShowFallback}
            date={date}
            partNames={partNames}
            Layout={Layout}
            lang={lang}
        />
    );
};

export default Parts;
