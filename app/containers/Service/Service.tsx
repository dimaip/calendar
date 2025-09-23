import { getFeastInfo } from 'domain/getDayInfo';

import React, { Suspense, useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { css } from 'emotion';
import useDay from 'hooks/useDay';
import Zoom from 'components/Zoom/Zoom';
import Loader from 'components/Loader/Loader';
import LayoutInner from 'components/LayoutInner/LayoutInner';
import CalendarToggle from 'components/CalendarToggle/CalendarToggle';
import { Note } from 'components/Note/Note';
import ScriptVersionSelector from 'components/ScriptVersionSelector/ScriptVersionSelector';
import ScriptEditorToggle from 'components/ScriptEditor/ScriptEditorToggle';
import { Tour } from 'components/Tour/Tour';
import { useSyncCurrentScriptVersion } from 'components/ScriptVersionSelector/useSyncCurrentScriptVersion';
import { useDocumentTitle } from 'utils/useDocumentTitle';

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
    location.reload();
};

const toUpperCase = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const Service = () => {
    const { serviceId: originalServiceId, date } = useParams();
    const { data: day } = useDay(date);

    const history = useHistory();

    const langState = useContext(LangContext);

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
    const service = services.find(
        (service) => service.id.split('/')[0] === (serviceId || originalServiceId?.split?.('/')?.[0])
    );

    if (service?.skipRedirect) {
        serviceId = originalServiceId.split('/')[0];
    }

    const [TextComponent, setTextComponent] = useState();
    useEffect(() => {
        if (serviceId) {
            const serviceIdUpper = toUpperCase(serviceId);
            const Component = React.lazy(async () =>
                import(`./Texts/${serviceIdUpper}/index.dyn.tsx`).catch(reloadOnFailedImport)
            );
            setTextComponent(Component);
        }
    }, [serviceId]);
    useEffect(() => {
        // Reset TOC on service change
        window.TOC = {};
    }, [serviceId]);

    useDocumentTitle(`${date} - ${service?.title} - Православное богослужение на русском языке`);

    if (!day) {
        return <Loader />;
    }

    // If service not found, redirect
    if (!serviceId) {
        if (day?.readings) {
            if (day?.readings?.['Вечерня'] && lpod) {
                return <Redirect to={{ pathname: `/date/${date}/service/Вечерня`, state: history.location.state }} />;
            }
            if (day?.readings?.['Литургия']) {
                return <Redirect to={{ pathname: `/date/${date}/service/Литургия`, state: history.location.state }} />;
            }
            return <Redirect to={`/date/${date}`} />;
        }
    }

    const setNewDate = (dateString) => {
        history.push({
            pathname: `/date/${dateString}/service/${originalServiceId}`,
            state: { backLink: history.location.state?.backLink },
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
            {!service?.hideTOC && <TOCSwitcher service={service} lang={langState.lang} />}
            {service?.scriptEditor && <ScriptVersionSelector serviceId={serviceId} />}
        </>
    );

    // If service has no lang support, force it to 'ru'
    const effectiveLangState = service?.lang ? langState : { ...langState, lang: 'ru' };

    return (
        <ServiceContext.Provider value={{ serviceId }}>
            <LangContext.Provider value={effectiveLangState}>
                <LayoutInner left={left} paddedContent={false}>
                    {service?.scriptEditor && (
                        <>
                            <Tour serviceId={serviceId} />
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
                                        {TextComponent && <TextComponent date={date} lang={langState.lang} />}
                                    </Suspense>
                                </MDXProvider>
                            </div>
                        </>
                    </Zoom>
                </LayoutInner>
            </LangContext.Provider>
        </ServiceContext.Provider>
    );
};
export default Service;
