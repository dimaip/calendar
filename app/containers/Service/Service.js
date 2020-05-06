import React, { Suspense, useState, useEffect } from 'react';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/svgs/LeftIcon';
import MDXProvider from './MDXProvider';
import { css } from 'emotion';
import getTheme from 'styles/theme';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import useDay from 'hooks/useDay';
import Zoom from 'components/Zoom/Zoom';
import Loader from 'components/Loader/Loader';
import LanguageSwitcher from './LanguageSwitcher';
import TOCSwitcher from './TOCSwitcher';
import { format, parseISO } from 'date-fns';
import dateFormat from 'dateformat';
import { ru } from 'date-fns/locale';
import Calendar from '../Main/Calendar';
import Button from 'components/Button/Button';
import Cross from 'components/svgs/Cross';
import { getFeastInfo } from 'domain/getDayInfo';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from 'redux/actions/language';
import makeServices from './Texts/Texts';
import './Texts/Shared.css';
const reloadOnFailedImport = e => {
    console.warn('Imported asset not available, probably time to re-deploy', e);
    Sentry.captureException(e);
    location.reload();
};

const toUpperCase = name => name.charAt(0).toUpperCase() + name.slice(1);

const Service = () => {
    const { serviceId: originalServiceId, date } = useParams();
    const dateObj = parseISO(date);
    const { data: day } = useDay(date);
    const theme = getTheme(day?.colour);

    const lang = useSelector(state => state.settings.language);
    const dispatch = useDispatch();
    const setLang = language => dispatch(setLanguage(language));

    const [calendarShown, setCalendarShown] = useState(false);

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

    const handleDayClick = day => {
        const dateString = dateFormat(day, 'yyyy-mm-dd');

        setNewDate(dateString);
        setCalendarShown(false);
    };

    const backLink =
        history.location.state?.from === 'main'
            ? `/date/${date}`
            : history.location.state?.from === 'readings'
            ? `/date/${date}/readings/${originalServiceId}`
            : `/date/${date}/services`;

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                        height: 60px;
                        border-bottom: 1px solid #ccc;
                        position: sticky;
                        top: 0;
                        background-color: white;
                        z-index: 1;
                    `}
                >
                    <div>
                        <Link to={backLink} title="Назад">
                            <div
                                className={css`
                                    padding: 18px;
                                    &:hover {
                                        opacity: 0.8;
                                    }
                                `}
                            >
                                <LeftIcon colour={theme.colours.darkGray} />
                            </div>
                        </Link>
                    </div>
                    <div
                        className={css`
                            flex-grow: 1;
                            display: flex;
                            align-items: center;
                        `}
                    >
                        {service?.calendar && (
                            <Button
                                title={calendarShown ? 'Спрятать календарь' : 'Показать календарь'}
                                className={css`
                                    flex-shrink: 0;
                                    display: flex;
                                    align-items: center;
                                    border-radius: 5px;
                                    padding: 8px !important;
                                    line-height: 1.2;
                                    text-align: center;
                                    background: ${theme.colours.bgGrayDark};
                                    font-size: 14px;
                                    margin-right: 8px;
                                `}
                                onClick={() => setCalendarShown(!calendarShown)}
                            >
                                {format(dateObj, 'd MMMM, EEEEEE', { locale: ru })}
                                {calendarShown ? <Cross /> : null}
                            </Button>
                        )}
                        {service?.lang && <LanguageSwitcher lang={lang} setLang={setLang} />}
                        <TOCSwitcher serviceId={serviceId} />
                    </div>

                    <div
                        className={css`
                            flex-grow: 0;
                        `}
                    >
                        <ZoomControlToggle />
                    </div>
                </div>
                {calendarShown && (
                    <Calendar date={date} handleDayClick={handleDayClick} onClose={() => setCalendarShown(false)} />
                )}
                <div
                    className={css`
                        position: relative;
                    `}
                >
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
                                </div>

                                <MDXProvider>
                                    <Suspense fallback={Loader}>
                                        {TextComponent && <TextComponent date={date} lang={lang} />}
                                    </Suspense>
                                </MDXProvider>
                            </div>
                        </>
                    </Zoom>
                </div>
            </div>
        </ThemeProvider>
    );
};
export default Service;
