import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import ReadingsForService from './ReadingsForService';
import ServiceSelector from './ServiceSelector';
import useDay from 'hooks/useDay';
import getTheme from 'styles/theme';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';

const Readings = ({ brother = false }) => {
    const { service, date } = useParams();
    const history = useHistory();
    const day = useDay(date);
    const readings = brother ? day?.bReadings : day?.readings;
    const readingsForService = readings?.[service];
    const services = Object.keys(readings || {});
    const theme = getTheme(day?.colour);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                        margin-top: 12px;
                    `}
                >
                    <div
                        className={css`
                            position: absolute;
                        `}
                    >
                        <Link to={`/date/${date}`} title="Назад">
                            <div
                                className={css`
                                    padding: 18px;
                                    &:hover {
                                        opacity: 0.8;
                                    }
                                `}
                            >
                                <LeftIcon />
                            </div>
                        </Link>
                    </div>
                    <ServiceSelector
                        {...{
                            service,
                            services,
                            onChange: e =>
                                history.push(`/date/${date}/${brother ? 'bReadings' : 'readings'}/${e.target.value}`),
                        }}
                    />
                    <div
                        className={css`
                            position: absolute;
                            right: 12px;
                        `}
                    >
                        <ZoomControlToggle />
                    </div>
                </div>
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
