import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import ReadingsForService from './ReadingsForService';
import ServiceSelector from './ServiceSelector';
import useDay from 'hooks/useDay';
import dateFormat from 'dateformat';
import Button from 'components/Button/Button';
import Cross from 'components/svgs/Cross';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import Calendar from 'components/Calendar/Calendar';
import { getFeastInfo } from 'domain/getDayInfo';
import Prayer from 'components/svgs/Prayer';
import { useTheme } from 'emotion-theming';
import LayoutInner from 'components/LayoutInner/LayoutInner';
import CalendarToggle from 'components/CalendarToggle/CalendarToggle';

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
            state: { from: 'readings' },
        };
    } else if (brother && service === 'Вечером') {
        to = {
            pathname: `/date/${date}/service/vespers`,
            state: { from: 'readings' },
        };
    } else if (service === 'Литургия') {
        to = {
            pathname: `/date/${date}/service/Литургия`,
            state: { from: 'readings' },
        };
    } else if (service === 'Вечерня' && lpod) {
        to = {
            pathname: `/date/${date}/service/Вечерня`,
            state: { from: 'readings' },
        };
    }

    const left = (
        <>
            <CalendarToggle
                date={date}
                setNewDate={setNewDate}
                className={css`
                    margin-right: 8px;
                `}
            />
            <ServiceSelector
                {...{
                    service,
                    services,
                    onChange: value => history.push(`/date/${date}/${brother ? 'bReadings' : 'readings'}/${value}`),
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
        </>
    );

    return (
        <LayoutInner left={left}>
            {Boolean(day) ? <ReadingsForService readingsForService={readingsForService} /> : <Loader />}
        </LayoutInner>
    );
};
export default Readings;
