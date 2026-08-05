import React, { createContext, useContext } from 'react';
import * as Sentry from '@sentry/react';
import { css } from '@emotion/css';
import Button from 'components/Button/Button';
import SolidSection from 'components/SolidSection/SolidSection';
import { useTheme } from '@emotion/react';
import Visibility from 'components/svgs/Visibility';
import VisibilityOff from 'components/svgs/VisibilityOff';
import CustomPrayers from 'components/CustomPrayers/CustomPrayers';

import { LangContext } from '../LangContext';
import { useMdxLoaderRuntime } from './MdxLoaderRuntime';
import { createSuspenseResourceCache } from './suspenseResourceCache';

export const MdxLoaderContext = createContext(0);

interface MdxLoaderProps {
    isCustomPrayer?: boolean;
    lang?: string;
    langOverride?: string;
    src: string;
    [key: string]: unknown;
}

const catchFailedImport = (error: unknown): never => {
    console.warn('Loading mdx file failed', error);
    Sentry.captureException?.(error);
    throw error instanceof Error ? error : new Error(String(error));
};

/**
 * The world is not without good people: https://twitter.com/JLarky/status/1585448425813725184
 */
const componentCache = createSuspenseResourceCache<React.ComponentType<MdxLoaderProps>>();

interface MdxModule {
    default: React.ComponentType<MdxLoaderProps>;
}

const loadMdxModule = async (src: string, language: string): Promise<MdxModule> => {
    if (src.startsWith('Liturgies/Katekhumen/') && language === 'ru') {
        const relativeSource = src.slice('Liturgies/Katekhumen/'.length);
        return (await import(
            /* webpackMode: "lazy-once", webpackChunkName: "mdx-liturgy-katekhumen-ru" */
            `containers/Service/Texts/Liturgies/Katekhumen/${relativeSource}/ru.mdx`
        )) as MdxModule;
    }
    if (src.startsWith('Liturgies/Katekhumen/') && language === 'csj') {
        const relativeSource = src.slice('Liturgies/Katekhumen/'.length);
        return (await import(
            /* webpackMode: "lazy-once", webpackChunkName: "mdx-liturgy-katekhumen-csj" */
            `containers/Service/Texts/Liturgies/Katekhumen/${relativeSource}/csj.mdx`
        )) as MdxModule;
    }
    if (src.startsWith('Liturgies/Vernie/') && language === 'ru') {
        const relativeSource = src.slice('Liturgies/Vernie/'.length);
        return (await import(
            /* webpackMode: "lazy-once", webpackChunkName: "mdx-liturgy-vernie-ru" */
            `containers/Service/Texts/Liturgies/Vernie/${relativeSource}/ru.mdx`
        )) as MdxModule;
    }
    if (src.startsWith('Liturgies/Vernie/') && language === 'csj') {
        const relativeSource = src.slice('Liturgies/Vernie/'.length);
        return (await import(
            /* webpackMode: "lazy-once", webpackChunkName: "mdx-liturgy-vernie-csj" */
            `containers/Service/Texts/Liturgies/Vernie/${relativeSource}/csj.mdx`
        )) as MdxModule;
    }

    return (await import(
        /* webpackExclude: /Liturgies\/(?:Katekhumen|Vernie)\// */
        `containers/Service/Texts/${src}/${language}.mdx`
    )) as MdxModule;
};

const LazyComponent = (props: MdxLoaderProps): JSX.Element => {
    const language = props.lang || 'ru';
    const Component = componentCache.read(`${props.src}\0${language}`, async () => {
        try {
            const module = await loadMdxModule(props.src, language);
            return module.default;
        } catch (error) {
            return catchFailedImport(error);
        }
    });

    return <Component {...props} />;
};

const MdxLoader = (props: MdxLoaderProps): JSX.Element | null => {
    const theme = useTheme();
    const { currentScriptVersion, disabledPrayers, scriptEditorIsActive, serviceId, setDisabledPrayers } =
        useMdxLoaderRuntime();
    const { lang, langA, langB } = useContext(LangContext);
    const nestingLevel = useContext(MdxLoaderContext);
    const langEffective = props.langOverride || lang;
    const { src, isCustomPrayer } = props;
    const prayerId = currentScriptVersion ? `${serviceId}-${currentScriptVersion}-${src}` : null;
    const isDisabled = currentScriptVersion && disabledPrayers.includes(prayerId);
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

    if (currentScriptVersion && nestingLevel === 0 && scriptEditorIsActive && !isCustomPrayer) {
        return (
            <>
                <SolidSection
                    paddingTop={12}
                    paddingBottom={12}
                    marginTop={12}
                    marginBottom={12}
                    marginHorizontal={0}
                    className={css`
                        border-radius: 5px;
                        border: 0.5px ${isDisabled ? 'dashed' : 'solid'} ${theme.colours.lineGray} !important;
                        position: relative;
                        & .H3 {
                            margin-top: 0;
                        }
                    `}
                >
                    <Button
                        onClick={() => {
                            setDisabledPrayers(
                                isDisabled
                                    ? disabledPrayers.filter((t) => t !== prayerId)
                                    : [...disabledPrayers, prayerId]
                            );
                        }}
                        className={`mdxLoader-hide ${css`
                            position: absolute;
                            top: 0px;
                            right: 0px;
                            font-size: 14px;
                            margin-left: 0px;
                            z-index: 1;
                        `}`}
                    >
                        {isDisabled ? <Visibility /> : <VisibilityOff />}
                    </Button>
                    <div
                        style={
                            isDisabled
                                ? {
                                      height: 30,
                                      overflow: 'hidden',
                                      opacity: 0.5,
                                  }
                                : {}
                        }
                    >
                        <MdxLoaderContext.Provider value={nestingLevel + 1}>
                            <LazyComponent {...props} src={src} lang={langEffective} />
                        </MdxLoaderContext.Provider>
                    </div>
                </SolidSection>
                <CustomPrayers type={prayerId} />
            </>
        );
    }
    if (isDisabled) {
        return null;
    }

    return (
        <MdxLoaderContext.Provider value={nestingLevel + 1}>
            <LazyComponent {...props} src={src} lang={langEffective} />
        </MdxLoaderContext.Provider>
    );
};

export default MdxLoader;
