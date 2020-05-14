import React from 'react';
import { useParams } from 'react-router-dom';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import Zoom from 'components/Zoom/Zoom';
import useExternalDay from 'hooks/useExternalDay';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import ErrorMessage404 from 'components/ErrorMessage404/ErrorMessage404';
import RteText from 'components/RteText/RteText';
import { useTheme } from 'emotion-theming';
import LayoutInner from 'components/LayoutInner/LayoutInner';

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
        <LayoutInner>
            <InnerContent thisDay={thisDay} theme={theme} externalDayStatus={externalDayStatus} />
        </LayoutInner>
    );
};
export default ThisDay;
