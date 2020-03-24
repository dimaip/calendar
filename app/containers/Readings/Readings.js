import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import ReadingsForService from './ReadingsForService';
import ServiceSelector from './ServiceSelector';
import useDay from 'hooks/useDay';
import getTheme from 'styles/theme';
import dateFormat from 'dateformat';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Button from 'components/Button/Button';
import Cross from 'components/svgs/Cross';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import Calendar from 'containers/Main/Calendar';

const Readings = ({ brother = false }) => {
    const { service, date } = useParams();
    const dateObj = parseISO(date);
    const history = useHistory();
    const { data: day } = useDay(date);
    const readings = brother ? day?.bReadings : day?.readings;
    const readingsForService = readings?.[service];
    const services = Object.keys(readings || {});
    const theme = getTheme(day?.colour);

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
                            justify-content: flex-start;
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
                                background: ${theme.colours.bgGrayDark};
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
                    </div>

                    <div
                        className={css`
                            flex-grow: 0;
                        `}
                    >
                        <ZoomControlToggle />
                    </div>
                </div>
                {calendarShown && <Calendar date={date} handleDayClick={handleDayClick} />}

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
        </ThemeProvider>
    );
};
export default Readings;
