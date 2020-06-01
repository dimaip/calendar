import React, { Suspense, useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import MDXProvider from './MDXProvider';
import { css } from 'emotion';
import useDay from 'hooks/useDay';
import Zoom from 'components/Zoom/Zoom';
import Loader from 'components/Loader/Loader';
import LanguageSwitcher from './LanguageSwitcher';
import TOCSwitcher from './TOCSwitcher';
import { getFeastInfo } from 'domain/getDayInfo';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from 'redux/actions/language';
import makeServices from './Texts/Texts';
import './Texts/Shared.css';
import { useTheme } from 'emotion-theming';
import LayoutInner from 'components/LayoutInner/LayoutInner';
import CalendarToggle from 'components/CalendarToggle/CalendarToggle';
const reloadOnFailedImport = e => {
    console.warn('Imported asset not available, probably time to re-deploy', e);
    Sentry.captureException(e);
    location.reload();
};

const toUpperCase = name => name.charAt(0).toUpperCase() + name.slice(1);

const Service = () => {
    const { serviceId: originalServiceId, date } = useParams();
    const { data: day } = useDay(date);
    const theme = useTheme();

    const lang = useSelector(state => state.settings.language);
    const dispatch = useDispatch();
    const setLang = language => dispatch(setLanguage(language));

    const history = useHistory();

    const { vasiliy, lpod } = getFeastInfo(new Date(date));

    // Expand serviceId
    let serviceId;

    if (day?.readings?.[originalServiceId]) {
        if (originalServiceId === 'Литургия') {
            serviceId = vasiliy ? 'vasiliy' : 'zlatoust';
        } else if (originalServiceId === 'Вечерня' && lpod) {
            serviceId = 'lpod';
        }
    }

    const services = makeServices(date, day?.readings);
    const service = services.find(service => service.id === (serviceId || originalServiceId));

    if (service?.skipRedirect) {
        serviceId = originalServiceId;
    }

    const [TextComponent, setTextComponent] = useState();
    useEffect(() => {
        if (serviceId) {
            const serviceIdUpper = toUpperCase(serviceId);
            const Component = React.lazy(() =>
                import(`./Texts/${serviceIdUpper}/index.dyn.js`).catch(reloadOnFailedImport)
            );
            setTextComponent(Component);
        }
    }, [serviceId]);

    if (!day) {
        return <Loader />;
    }

    // If service not found, redirect
    if (!serviceId) {
        if (day?.readings) {
            if (day?.readings?.['Литургия']) {
                return <Redirect to={`/date/${date}/service/Литургия`} />;
            }
            if (day?.readings?.['Вечерня'] && lpod) {
                return <Redirect to={`/date/${date}/service/Вечерня`} />;
            }
            return <Redirect to={`/date/${date}`} />;
        }
    }

    const setNewDate = dateString => {
        history.push(`/date/${dateString}/service/${originalServiceId}`);
    };

    const backLink =
        history.location.state?.from === 'main'
            ? `/date/${date}`
            : history.location.state?.from === 'readings'
            ? `/date/${date}/readings/${originalServiceId}`
            : `/date/${date}/services`;

    const left = (
        <>
            <CalendarToggle
                date={date}
                setNewDate={setNewDate}
                className={css`
                    margin-right: 8px;
                `}
            />
            {service?.lang && <LanguageSwitcher lang={lang} setLang={setLang} />}
            <TOCSwitcher service={service} lang={lang} />
        </>
    );

    return (
        <LayoutInner backLink={backLink} left={left} paddedContent={false}>
            <Zoom>
                <>
                    <div
                        className={css`
                            margin-left: 12px;
                            margin-right: 12px;
                        `}
                    >
                        <div
                            className={css`
                                position: relative;
                                background: ${theme.colours.bgGray};
                                margin: 0 -12px 24px -12px;
                                padding: 12px 12px 12px 12px;
                                font-size: 13px;
                                color: ${theme.colours.darkGray};
                            `}
                        >
                            Изменяемые части богослужения составлены нашим роботом-уставщиком. Он иногда ошибается. За
                            наиболее точной информацией обращайтесь к{' '}
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
                        </div>

                        <MDXProvider>
                            <Suspense fallback={<Loader />}>
                                {TextComponent && <TextComponent date={date} lang={lang} />}
                            </Suspense>
                        </MDXProvider>
                    </div>
                </>
            </Zoom>
        </LayoutInner>
    );
};
export default Service;
