import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import ReadingsForService from './ReadingsForService';
import ServiceSelector from './ServiceSelector';
import useDay from 'hooks/useDay';
import dateFormat from 'dateformat';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Button from 'components/Button/Button';
import Cross from 'components/svgs/Cross';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import Calendar from 'containers/Main/Calendar';
import { getFeastInfo } from 'domain/getDayInfo';
import Prayer from 'components/svgs/Prayer';
import { useTheme } from 'emotion-theming';

const Readings = ({ brother = false }) => {
    const { service, date } = useParams();
    const dateObj = parseISO(date);
    const history = useHistory();
    const { data: day } = useDay(date);
    const readings = brother ? day?.bReadings : day?.readings;
    const readingsForService = readings?.[service];
    const services = Object.keys(readings || {});
    const theme = useTheme();

    const [calendarShown, setCalendarShown] = useState(false);

    useEffect(() => {
        // Redirect to first available service, if current one doesn't exist
        if (readings && !readingsForService) {
            history.replace(`/date/${date}/readings/${services[0]}`);
        }
    });

    const setNewDate = dateString => {
        history.push(`/date/${dateString}/readings/${service}`);
    };

    const handleDayClick = day => {
        const dateString = dateFormat(day, 'yyyy-mm-dd');

        setNewDate(dateString);
        setCalendarShown(false);
    };

    const { lpod } = getFeastInfo(new Date(date));

    let to = null;

    if (brother && service === 'Утром') {
        to = {
            pathname: `/date/${date}/service/matins`,
        };
    } else if (brother && service === 'Вечером') {
        to = {
            pathname: `/date/${date}/service/vespers`,
        };
    } else if (service === 'Литургия') {
        to = {
            pathname: `/date/${date}/service/Литургия`,
        };
    } else if (service === 'Вечерня' && lpod) {
        to = {
            pathname: `/date/${date}/service/Вечерня`,
        };
    }

    return (
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
                        justify-content: flex-start;
                    `}
                >
                    <Button
                        title={calendarShown ? 'Спрятать календарь' : 'Показать календарь'}
                        className={css`
                            flex-shrink: 0;
                            display: flex;
                            align-items: center;
                            border-radius: 5px;
                            padding: 8px !important;
                            line-height: 1.2;
                            background: ${theme.colours.bgGray};
                            font-size: 14px;
                            margin-right: 8px;
                        `}
                        onClick={() => setCalendarShown(!calendarShown)}
                    >
                        {format(dateObj, 'd MMMM, EEEEEE', { locale: ru })}
                        {calendarShown ? <Cross /> : null}
                    </Button>
                    <ServiceSelector
                        {...{
                            service,
                            services,
                            onChange: value =>
                                history.push(`/date/${date}/${brother ? 'bReadings' : 'readings'}/${value}`),
                        }}
                    />
                    {to && (
                        <Link
                            to={to}
                            title="На службу"
                            className={css`
                                margin-left: 10px;
                                margin-top: 5px;
                            `}
                        >
                            <Prayer colour={theme.colours.darkGray} />
                        </Link>
                    )}
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

            {Boolean(day) ? (
                <div
                    className={css`
                        padding: 0 18px;
                    `}
                >
                    <ReadingsForService readingsForService={readingsForService} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};
export default Readings;
