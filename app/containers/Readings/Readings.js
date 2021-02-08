import { getFeastInfo } from 'domain/getDayInfo';

import React, { useEffect } from 'react';
import { useParams, Link, useHistory, useLocation } from 'react-router-dom';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import useDay from 'hooks/useDay';
import Prayer from 'components/svgs/Prayer';
import { useTheme } from 'emotion-theming';
import LayoutInner from 'components/LayoutInner/LayoutInner';
import CalendarToggle from 'components/CalendarToggle/CalendarToggle';

import ServiceSelector from './ServiceSelector';
import ReadingsForService from './ReadingsForService';

const Readings = ({ brother = false }) => {
    const { service, date } = useParams();
    const history = useHistory();
    const { data: day } = useDay(date);
    const readings = brother ? day?.bReadings : day?.readings;
    const readingsForService = readings?.[service];
    const services = Object.keys(readings || {});
    const theme = useTheme();

    useEffect(() => {
        // Redirect to first available service, if current one doesn't exist
        if (readings && !readingsForService) {
            history.replace({ pathname: `/date/${date}/readings/${services[0]}`, state: history.location.state });
        }
    });

    const setNewDate = (dateString) => {
        history.push({
            pathname: `/date/${dateString}/readings/${service}`,
            state: {
                backLink: history.location.state?.backLink,
            },
        });
    };

    const { lpod } = getFeastInfo(new Date(date));

    let to = null;

    if (brother && service === 'Утром') {
        to = {
            pathname: `/date/${date}/service/matins`,
            state: { backLink: history.location.pathname },
        };
    } else if (brother && service === 'Вечером') {
        to = {
            pathname: `/date/${date}/service/vespers`,
            state: { backLink: history.location.pathname },
        };
    } else if (service === 'Литургия') {
        to = {
            pathname: `/date/${date}/service/Литургия`,
            state: { backLink: history.location.pathname },
        };
    } else if (service === 'Вечерня' && lpod) {
        to = {
            pathname: `/date/${date}/service/Вечерня`,
            state: { backLink: history.location.pathname },
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
                    onChange: (value) =>
                        history.push({
                            pathname: `/date/${date}/${brother ? 'bReadings' : 'readings'}/${value}`,
                            state: {
                                backLink: history.location.state?.backLink,
                            },
                        }),
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
