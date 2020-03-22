import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import getTheme from 'styles/theme';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import useDay from 'hooks/useDay';
import Zoom from 'components/Zoom/Zoom';
import useExternalDay from 'hooks/useExternalDay';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const ThisDay = () => {
    const { thisDayId, date } = useParams();
    const { data: externalDay, status: externalDayStatus } = useExternalDay(date);
    const { thisDays } = externalDay || {};

    const thisDay = (thisDays || []).find(thisDay => thisDay.id === thisDayId);
    const { data: day } = useDay(date);
    const theme = getTheme(day?.colour);
    if (externalDayStatus === 'loading') {
        return <Loader />;
    }

    if (externalDayStatus === 'error' || !thisDays) {
        return <ErrorMessage />;
    }

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
                    <div
                        className={css`
                            position: absolute;
                            right: 12px;
                        `}
                    >
                        <ZoomControlToggle />
                    </div>
                </div>
                <div
                    className={css`
                        margin-top: 24px;
                        padding: 0 16px 16px 16px;
                    `}
                >
                    <h3
                        className={css`
                            color: ${theme.colours.primary};
                            margin-bottom: 12px;
                            font-size: 30px;
                        `}
                    >
                        {thisDay.title}
                    </h3>
                    {thisDay.image && (
                        <div
                            className={css`
                                margin-top: 24px;
                                margin-bottom: 24px;
                            `}
                        >
                            <img
                                src={thisDay.image}
                                alt={thisDay.title}
                                className={css`
                                    max-width: 100%;
                                `}
                            />
                        </div>
                    )}
                    <Zoom>
                        <div
                            dangerouslySetInnerHTML={{ __html: thisDay.bodytext }}
                            className={css`
                                line-height: 1.5;
                                color: ${theme.colours.darkGray};

                                & p {
                                    margin-bottom: 12px;
                                }

                                & a {
                                    color: ${theme.colours.primary};
                                }
                            `}
                        />
                    </Zoom>
                </div>
            </div>
        </ThemeProvider>
    );
};
export default ThisDay;
