import { getFeastInfo } from 'domain/getDayInfo';

import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/css';
import Loader from 'components/Loader/Loader';
import useDay from 'hooks/useDay';
import Prayer from 'components/svgs/Prayer';
import { useTheme } from '@emotion/react';
import LayoutInner from 'components/LayoutInner/LayoutInner';
import CalendarToggle from 'components/CalendarToggle/CalendarToggle';
import { useDocumentTitle } from 'utils/useDocumentTitle';

import ServiceSelector from './ServiceSelector';
import ReadingsForService from './ReadingsForService';

const Readings = ({ brother = false }) => {
    const { service = '', date = '' } = useParams<'date' | 'service'>();
    const location = useLocation();
    const navigate = useNavigate();
    const { data: day } = useDay(date);
    const readings = brother ? day?.bReadings : day?.readings;
    const readingsForService = readings?.[service];
    const services = Object.keys(readings || {});
    const firstService = services[0];
    const theme = useTheme();

    useDocumentTitle(`${date} - Чтения - Православное богослужение на русском языке`);

    useEffect(() => {
        // Redirect to first available service, if current one doesn't exist
        if (readings && !readingsForService) {
            void navigate(`/date/${date}/readings/${firstService}`, {
                replace: true,
                state: location.state,
            });
        }
    }, [date, firstService, location.state, navigate, readings, readingsForService]);

    const setNewDate = (dateString) => {
        void navigate(`/date/${dateString}/readings/${service}`, {
            state: {
                backLink: location.state?.backLink,
            },
        });
    };

    const { lpod } = getFeastInfo(new Date(date));

    let servicePath: string | null = null;

    if (brother && service === 'Утром') {
        servicePath = `/date/${date}/service/matins`;
    } else if (brother && service === 'Вечером') {
        servicePath = `/date/${date}/service/vespers`;
    } else if (service === 'Литургия') {
        servicePath = `/date/${date}/service/Литургия`;
    } else if (service === 'Вечерня' && lpod) {
        servicePath = `/date/${date}/service/Вечерня`;
    } else if (service === '6-й час') {
        servicePath = `/date/${date}/service/sixthHour`;
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
                    onChange: (value) => {
                        void navigate(`/date/${date}/${brother ? 'bReadings' : 'readings'}/${value}`, {
                            state: {
                                backLink: location.state?.backLink,
                            },
                        });
                    },
                }}
            />
            {servicePath && (
                <Link
                    to={servicePath}
                    state={{ backLink: location.pathname }}
                    title="На службу"
                    className={css`
                        margin-left: 10px;
                        margin-top: 8px;
                        width: 20px;
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
