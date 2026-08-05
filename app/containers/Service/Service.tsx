import { getFeastInfo } from 'domain/getDayInfo';

import * as Sentry from '@sentry/react';
import React, { Suspense, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/css';
import useDay from 'hooks/useDay';
import Zoom from 'components/Zoom/Zoom';
import Loader from 'components/Loader/Loader';
import LayoutInner from 'components/LayoutInner/LayoutInner';
import CalendarToggle from 'components/CalendarToggle/CalendarToggle';
import { Note } from 'components/Note/Note';
import ScriptVersionSelector from 'components/ScriptVersionSelector/ScriptVersionSelector';
import ScriptEditorToggle from 'components/ScriptEditor/ScriptEditorToggle';
import { useSyncCurrentScriptVersion } from 'components/ScriptVersionSelector/useSyncCurrentScriptVersion';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import { useRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';
import customPrayerInputState from 'state/customPrayerInputState';
import customPrayerEditIdState from 'state/customPrayerEditIdState';
import Button from 'components/Button/Button';
import Pencil from 'components/svgs/Pencil';
import CustomPrayerInput from 'components/CustomPrayers/CustomPrayerInput';
import { usePrayerTimer } from 'containers/HabitTracker/usePrayerTimer';
import PostPrayerPrompt from 'containers/HabitTracker/PostPrayerPrompt';
import { TOCProvider } from 'components/TOC/TOCProvider';
import { markNavigationIntent, markPerformance } from 'utils/performanceMarks';

import LanguageSwitcher from './LanguageSwitcher';
import TOCSwitcher from './TOCSwitcher';
import useServices from './Texts/Texts';
import MDXProvider from './MDXProvider';
import ParallelLanguageBar from './ParallelLanguageBar';
import { LangContext } from './LangContext';
import { ServiceContext } from './ServiceContext';

const reloadOnFailedImport = (e) => {
    console.warn('Imported asset not available, probably time to re-deploy', e);
    Sentry.captureException?.(e);
    throw e;
};

const toUpperCase = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const ServiceCommitMarker = ({ renderKey }: { renderKey: string }): null => {
    useEffect(() => {
        if (typeof performance === 'undefined' || !performance.mark) {
            return;
        }

        performance.clearMarks?.('service_complete_commit');
        markPerformance('service_complete_commit', { renderKey });
    }, [renderKey]);

    return null;
};

const ServiceShellMarker = ({ renderKey }: { renderKey: string }): null => {
    useEffect(() => {
        markPerformance('service_shell_ready', { renderKey });
    }, [renderKey]);

    return null;
};

const Service = () => {
    const { serviceId: originalServiceId = '', date = '', prayerId } = useParams<'date' | 'prayerId' | 'serviceId'>();
    const { data: day } = useDay(date);

    const location = useLocation();
    const navigate = useNavigate();

    const langState = useContext(LangContext);

    const [customPrayerInputShown, setCustomPrayerInputShown] = useState(false);

    const [customPrayers] = useRecoilState<Array<{ id: number; text: string }>>(customPrayersState('Sugubaja') as any);
    const [, setInputText] = useRecoilState<string | null>(customPrayerInputState);
    const [, setEditId] = useRecoilState<number | null>(customPrayerEditIdState);

    const { vasiliy, lpod } = getFeastInfo(new Date(date));

    useSyncCurrentScriptVersion('matins');
    useSyncCurrentScriptVersion('vespers');

    // Expand serviceId
    let serviceId;

    if (day?.readings?.[originalServiceId]) {
        if (originalServiceId === 'Литургия') {
            serviceId = vasiliy ? 'vasiliy' : 'zlatoust';
        } else if (originalServiceId === 'Вечерня' && lpod) {
            serviceId = 'lpod';
        }
    }

    const services = useServices(date, day?.readings);
    const service = services.find((service) => {
        if (originalServiceId === 'customPrayer') {
            return String(service.customPrayerId) === prayerId;
        }
        return service.id.split('/')[0] === (serviceId || originalServiceId?.split?.('/')?.[0]);
    });

    if (service?.skipRedirect) {
        serviceId = originalServiceId.split('/')[0];
    }

    const TextComponent = useMemo(() => {
        if (!serviceId) {
            return null;
        }

        const serviceIdUpper = toUpperCase(serviceId);
        return React.lazy(async () => {
            try {
                return await import(`./Texts/${serviceIdUpper}/index.dyn.tsx`);
            } catch (error) {
                return reloadOnFailedImport(error);
            }
        });
    }, [serviceId]);
    const currentServiceId = serviceId || originalServiceId;
    const serviceRenderKey = [
        date,
        currentServiceId,
        service?.lang ? langState?.lang || 'ru' : 'ru',
        service?.lang ? langState?.langA || '' : '',
        service?.lang ? langState?.langB || '' : '',
    ].join(':');
    useLayoutEffect(() => {
        if (typeof performance !== 'undefined') {
            performance.clearMarks?.('service_complete_commit');
        }
    }, [serviceRenderKey]);

    const { completionPromptTimeOfDay, dismissCompletionPrompt } = usePrayerTimer({
        date,
        serviceId: currentServiceId,
    });

    useDocumentTitle(`${date} - ${service?.title} - Православное богослужение на русском языке`);

    if (!day) {
        return <Loader />;
    }

    // If service not found, redirect
    if (!serviceId) {
        if (day?.readings) {
            if (day?.readings?.['Вечерня'] && lpod) {
                return <Navigate replace state={location.state} to={`/date/${date}/service/Вечерня`} />;
            }
            if (day?.readings?.['Литургия']) {
                return <Navigate replace state={location.state} to={`/date/${date}/service/Литургия`} />;
            }
            return <Navigate replace to={`/date/${date}`} />;
        }
    }

    const setNewDate = (dateString) => {
        const target = `/date/${dateString}/service/${originalServiceId}`;
        markNavigationIntent({ initiator: 'service-date-change', target });
        void navigate(target, {
            state: { backLink: location.state?.backLink },
        });
    };

    const left = (
        <>
            {service?.calendar && (
                <CalendarToggle
                    date={date}
                    setNewDate={setNewDate}
                    className={css`
                        margin-right: 8px;
                    `}
                />
            )}
            {service?.lang && <LanguageSwitcher />}
            {!service?.hideTOC && <TOCSwitcher />}
            {service?.scriptEditor && <ScriptVersionSelector serviceId={serviceId} />}
        </>
    );

    // If service has no lang support, force it to 'ru'
    const effectiveLangState = service?.lang ? langState : { ...langState, lang: 'ru' };

    const right = service?.customPrayerId ? (
        <Button
            onClick={() => {
                const prayer = customPrayers.find((p) => p.id === service?.customPrayerId);
                if (prayer) {
                    setEditId(prayer.id);
                    setInputText(prayer.text || '');
                    setCustomPrayerInputShown(true);
                }
            }}
            title="Редактировать молитву"
            className={css`
                margin-top: 3px;
            `}
        >
            <Pencil />
        </Button>
    ) : null;

    return (
        <ServiceContext.Provider value={{ serviceId }}>
            <LangContext.Provider value={effectiveLangState}>
                <TOCProvider key={`${date}:${currentServiceId}`}>
                    <LayoutInner left={left} right={right} paddedContent={false}>
                        <ServiceShellMarker renderKey={serviceRenderKey} />
                        {service?.scriptEditor && (
                            <>
                                <ScriptEditorToggle serviceId={serviceId} />
                            </>
                        )}

                        <ParallelLanguageBar />
                        <Zoom>
                            <>
                                <div
                                    className={css`
                                        margin-left: 12px;
                                        margin-right: 12px;
                                        margin-bottom: 24px;
                                    `}
                                >
                                    {service?.warn && (
                                        <Note>
                                            Изменяемые части богослужения составлены нашим роботом-уставщиком. Он иногда
                                            ошибается. За наиболее точной информацией обращайтесь к{' '}
                                            <a
                                                className={css`
                                                    text-decoration: underline;
                                                `}
                                                href={`http://www.patriarchia.ru/bu/${date}`}
                                                target="_blank"
                                            >
                                                богослужебным указаниям.
                                            </a>{' '}
                                            Если вы обнаружили ошибку, пожалуйста,{' '}
                                            <a
                                                className={css`
                                                    text-decoration: underline;
                                                `}
                                                href="mailto:pb@psmb.ru"
                                                target="_blank"
                                            >
                                                напишите нам
                                            </a>
                                        </Note>
                                    )}

                                    <MDXProvider>
                                        <Suspense fallback={<Loader />}>
                                            {TextComponent && (
                                                <>
                                                    <TextComponent date={date} lang={langState.lang} />
                                                    <ServiceCommitMarker renderKey={serviceRenderKey} />
                                                </>
                                            )}
                                        </Suspense>
                                    </MDXProvider>
                                </div>
                            </>
                        </Zoom>
                        {customPrayerInputShown && (
                            <CustomPrayerInput
                                onClose={() => {
                                    setCustomPrayerInputShown(false);
                                }}
                            />
                        )}
                        <PostPrayerPrompt timeOfDay={completionPromptTimeOfDay} onDismiss={dismissCompletionPrompt} />
                    </LayoutInner>
                </TOCProvider>
            </LangContext.Provider>
        </ServiceContext.Provider>
    );
};
export default Service;
