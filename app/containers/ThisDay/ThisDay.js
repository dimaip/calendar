import React from 'react';
import { useParams, Link } from 'react-router-dom';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Zoom from 'components/Zoom/Zoom';
import useExternalDay from 'hooks/useExternalDay';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import ErrorMessage404 from 'components/ErrorMessage404/ErrorMessage404';
import RteText from 'components/RteText/RteText';
import { useTheme } from 'emotion-theming';

const InnerContent = ({ theme, thisDay, externalDayStatus }) => {
    if (externalDayStatus === 'loading') {
        return <Loader />;
    }

    if (externalDayStatus === 'error') {
        return <ErrorMessage500 />;
    }
    if (!thisDay) {
        return <ErrorMessage404 />;
    }
    return (
        <>
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
                <RteText html={thisDay.bodytext} />
            </Zoom>
        </>
    );
};

const ThisDay = () => {
    const { thisDayId, date } = useParams();
    const { data: externalDay, status: externalDayStatus } = useExternalDay(date);
    const { thisDays } = externalDay || {};

    const thisDay = (thisDays || []).find(thisDay => thisDay.id === thisDayId);
    const theme = useTheme();

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
                <InnerContent thisDay={thisDay} theme={theme} externalDayStatus={externalDayStatus} />
            </div>
        </div>
    );
};
export default ThisDay;
