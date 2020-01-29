import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/LeftIcon/LeftIcon';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import ReadingsForService from './ReadingsForService';
import ServiceSelector from './ServiceSelector';
import useDay from 'hooks/useDay';
import getTheme from 'styles/theme';

const Readings = () => {
    const { service, date } = useParams();
    const history = useHistory();
    const day = useDay();
    const readingsForService = day?.readings?.[service];
    const services = Object.keys(day?.readings || {});

    const theme = getTheme(day?.colour);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div
                    className={css`
                        display: flex;
                        align-items: center;
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
                            onChange: e => history.push(`/date/${date}/readings/${e.target.value}`),
                        }}
                    />
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
