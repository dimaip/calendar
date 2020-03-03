import React, { Suspense, useState } from 'react';
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
import TOC from './TOC';
import { format, parseISO } from 'date-fns';
import dateFormat from 'dateformat';
import { ru } from 'date-fns/locale';
import Calendar from '../Main/Calendar';
import CalendarIcon from 'components/svgs/CalendarIcon';
import Button from 'components/Button/Button';
import Cross from 'components/svgs/Cross';
const Zlatoust = React.lazy(() => import('./Texts/Zlatoust'));
const Vasiliy = React.lazy(() => import('./Texts/Vasiliy'));

const Service = () => {
    const { serviceId, date } = useParams();
    const dateObj = parseISO(date);
    const { data: day } = useDay(date);
    const theme = getTheme(day?.colour);

    const [lang, setLang] = useState('default');
    const [showTOC, setShowTOC] = useState(false);
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
                        <Link to={`/date/${date}/services`} title="Назад">
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
                    <Button
                        className={css`
                            display: flex;
                            align-items: center;
                        `}
                        onClick={() => setCalendarShown(!calendarShown)}
                    >
                        <div
                            className={css`
                                margin-right: 12px;
                            `}
                        >
                            {format(dateObj, 'd MMMM, EEEEEE', { locale: ru })}
                        </div>
                        {calendarShown ? <Cross /> : <CalendarIcon />}
                    </Button>
                    <div
                        className={css`
                            position: absolute;
                            right: 12px;
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <LanguageSwitcher lang={lang} setLang={setLang} />
                        <ZoomControlToggle />
                        <TOCSwitcher showTOC={showTOC} setShowTOC={setShowTOC} />
                    </div>
                </div>
                {calendarShown && <Calendar date={date} handleDayClick={handleDayClick} />}
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
                                </Suspense>
                            </div>
                            {<TOC serviceId={serviceId} showTOC={showTOC} setShowTOC={setShowTOC} />}
                        </>
                    </Zoom>
                </div>
            </div>
        </ThemeProvider>
    );
};
export default Service;
