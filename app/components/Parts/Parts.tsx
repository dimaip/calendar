import React, { useContext } from 'react';
import { css } from 'emotion';
import useParts from 'hooks/useParts';
import RteText from 'components/RteText/RteText';
import { LangContext } from 'containers/Service/LangContext';
import { HeightUpdater } from 'components/HeightUpdate/HeightUpdater';

const objAccess = (object, path, serviceType = null) => {
    const result = path.split('.').reduce((acc, curr) => acc?.[curr], object);
    return result
        ?.map((obj) => {
            if (!serviceType || !obj.services) {
                return obj.value;
            }
            if (obj.services.includes(serviceType)) {
                return obj.value;
            }
            return null;
        })
        .filter(Boolean);
};

interface Flags {
    hasExclusiveEnding: boolean;
    hasExclusiveBeginning: boolean;
}

const renderFallback = (
    fallback: JSX.Element | ((noTexts: boolean, externalTexts: JSX.Element | null, flags: Flags | null) => JSX.Element),
    noTexts = false,
    externalTexts = null,
    flags: Flags | null = null
): JSX.Element => {
    if (typeof fallback === 'function') {
        return fallback(noTexts, externalTexts, flags);
    }
    return fallback;
};

const PartRenderer = ({
    date,
    lang,
    partNames,
    serviceType,
    fallback,
    fallbackRendersExternalTexts,
    alwaysShowFallback,
    Layout,
    partsProcessor,
}) => {
    const { data: parts } = useParts(date, lang);
    let texts = partNames
        .map((partName) => {
            return objAccess(parts, partName, serviceType) || [];
        })
        .flatten();

    texts = partsProcessor(texts);
    const hasExclusiveTexts = Boolean(texts.find((text) => text?.includes?.('ЗАМЕНА')));
    const hasExclusiveBeginning = Boolean(texts.find((text) => text?.includes?.('УБРАТЬСЛАВА')));
    const hasExclusiveEnding = Boolean(texts.find((text) => text?.includes?.('УБРАТЬИНЫНЕ')));
    const exclusiveTextsAndPlain = texts
        .filter(
            (text) =>
                text?.includes?.('ЗАМЕНА') ||
                text?.includes?.('НЕТЗАМЕНЫ') ||
                text?.includes?.('УБРАТЬИНЫНЕ') ||
                text?.includes?.('УБРАТЬСЛАВА')
        )
        .map((text) =>
            text.replace('ЗАМЕНА', '').replace('НЕТЗАМЕНЫ', '').replace('УБРАТЬИНЫНЕ', '').replace('УБРАТЬСЛАВА', '')
        );
    texts = hasExclusiveTexts
        ? exclusiveTextsAndPlain
        : texts.map((text) =>
              typeof text === 'string'
                  ? text.replace('НЕТЗАМЕНЫ', '').replace('УБРАТЬИНЫНЕ', '').replace('УБРАТЬСЛАВА', '')
                  : text
          );

    if (!texts?.length) {
        return fallback ? (
            <HeightUpdater>
                <Layout>{renderFallback(fallback, true)}</Layout>
            </HeightUpdater>
        ) : null;
    }

    const externalTexts = texts?.map?.((element, index) =>
        typeof element === 'string' ? (
            <RteText
                key={index}
                html={element}
                className={css`
                    margin-bottom: 12px;

                    & ._-ОСНОВНОЙ_Основной-отст1-5 {
                        text-indent: 0;
                        margin-left: 0;
                    }
                `}
            />
        ) : (
            element
        )
    );

    return (
        <HeightUpdater>
            <Layout>
                <div>
                    {alwaysShowFallback &&
                        !hasExclusiveTexts &&
                        renderFallback(fallback, false, externalTexts, { hasExclusiveEnding, hasExclusiveBeginning })}
                </div>
                {(!fallbackRendersExternalTexts || hasExclusiveTexts) && externalTexts}
            </Layout>
        </HeightUpdater>
    );
};

const Parts = ({
    date,
    partNames,
    serviceType = null,
    fallback = null,
    alwaysShowFallback = false,
    Layout = ({ children }) => children,
    partsProcessor = (parts) => parts,
    fallbackRendersExternalTexts = false,
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
                            serviceType={serviceType}
                            alwaysShowFallback={alwaysShowFallback}
                            date={date}
                            partNames={partNames}
                            Layout={Layout}
                            lang={langA}
                            partsProcessor={partsProcessor}
                            fallbackRendersExternalTexts={fallbackRendersExternalTexts}
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
                            serviceType={serviceType}
                            alwaysShowFallback={alwaysShowFallback}
                            date={date}
                            partNames={partNames}
                            Layout={Layout}
                            lang={langB}
                            partsProcessor={partsProcessor}
                            fallbackRendersExternalTexts={fallbackRendersExternalTexts}
                        />
                    </LangContext.Provider>
                </div>
            </div>
        );
    }

    return (
        <PartRenderer
            fallback={fallback}
            serviceType={serviceType}
            alwaysShowFallback={alwaysShowFallback}
            date={date}
            partNames={partNames}
            Layout={Layout}
            lang={lang}
            partsProcessor={partsProcessor}
            fallbackRendersExternalTexts={fallbackRendersExternalTexts}
        />
    );
};

export default Parts;
