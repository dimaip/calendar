import React, { createContext, useContext } from 'react';
import * as Sentry from '@sentry/react';
import { css } from 'emotion';
import Button from 'components/Button/Button';
import SolidSection from 'components/SolidSection/SolidSection';
import { useTheme } from 'emotion-theming';
import { useRecoilState, useRecoilValue } from 'recoil';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import disabledPrayersState from 'state/disabledPrayersState';
import Visibility from 'components/svgs/Visibility';
import VisibilityOff from 'components/svgs/VisibilityOff';
import CustomPrayers from 'components/CustomPrayers/CustomPrayers';

import { LangContext } from '../LangContext';
import { ServiceContext } from '../ServiceContext';
import currentScriptVersionState from 'state/currentScriptVersion';

export const MdxLoaderContext = createContext(0);

const catchFailedImport = (e) => {
    console.warn('Loading mdx file failed', e);
    Sentry.captureException?.(e);
};

/**
 * The world is not without good people: https://twitter.com/JLarky/status/1585448425813725184
 */
const componentCache = new Map();

const LazyComponent = (props) => {
    const key = `${props.src}${props.lang || 'ru'}`;
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
    const theme = useTheme();
    const serviceContext = useContext(ServiceContext);
    const serviceId = serviceContext?.serviceId;
    const currentScriptVersion = useRecoilValue<string | null>(currentScriptVersionState(serviceId));
    const [scriptEditorIsActive] = useRecoilState(scriptEditorIsActiveState);
    const [disabledPrayers, setDisabledPrayers] = useRecoilState(disabledPrayersState);
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
    return (
        !isDisabled && (
            <MdxLoaderContext.Provider value={nestingLevel + 1}>
                <LazyComponent {...props} src={src} lang={langEffective} />
            </MdxLoaderContext.Provider>
        )
    );
};

export default MdxLoader;
