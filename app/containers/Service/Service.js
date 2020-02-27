import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import getTheme from 'styles/theme';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import useDay from 'hooks/useDay';
import Zoom from 'components/Zoom/Zoom';
import Loader from 'components/Loader/Loader';
const Zlatoust = React.lazy(() => import('./Texts/Zlatoust'));

const Service = () => {
    const { serviceId, date } = useParams();
    const { data: day } = useDay(date);
    const theme = getTheme(day?.colour);

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
                    `}
                >
                    <div
                        className={css`
                            position: absolute;
                        `}
                    >
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
                    <div
                        className={css`
                            position: absolute;
                            right: 12px;
                        `}
                    >
                        <ZoomControlToggle />
                    </div>
                </div>
                <Zoom>
                    <div
                        className={css`
                            margin-left: 12px;
                            margin-right: 12px;
                        `}
                    >
                        <Suspense fallback={Loader}>{serviceId === 'zlatoust' && <Zlatoust />}</Suspense>
                    </div>
                </Zoom>
            </div>
        </ThemeProvider>
    );
};
export default Service;
