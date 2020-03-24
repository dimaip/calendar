import React, { Suspense, useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/svgs/LeftIcon';
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
const Zlatoust = React.lazy(() => import('./Texts/Zlatoust'));
const Vasiliy = React.lazy(() => import('./Texts/Vasiliy'));
const Lpod = React.lazy(() => import('./Texts/Lpod'));

const Service = () => {
    const { serviceId, date } = useParams();
    const dateObj = parseISO(date);
    const { data: day } = useDay(date);
    const theme = getTheme(day?.colour);

    const [lang, setLang] = useState('default');
    const [calendarShown, setCalendarShown] = useState(false);

    const history = useHistory();
    const setNewDate = dateString => {
        history.push(`/date/${dateString}/service/${serviceId}`);
    };

    const handleDayClick = day => {
        const dateString = dateFormat(day, 'yyyy-mm-dd');

        setNewDate(dateString);
        setCalendarShown(false);
    };

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
                        <Link to={`/date/${date}`} title="Назад">
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
                        <Button
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
                        <LanguageSwitcher lang={lang} setLang={setLang} />
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
                                <Suspense fallback={Loader}>
                                    {serviceId === 'zlatoust' && <Zlatoust lang={lang} />}
                                    {serviceId === 'vasiliy' && <Vasiliy lang={lang} />}
                                    {serviceId === 'lpod' && <Lpod lang={lang} />}
                                </Suspense>
                            </div>
                        </>
                    </Zoom>
                </div>
            </div>
        </ThemeProvider>
    );
};
export default Service;
