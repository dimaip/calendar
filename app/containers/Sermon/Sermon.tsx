import React from 'react';
import { useParams } from 'react-router-dom';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import useExternalDay from 'hooks/useExternalDay';
import Zoom from 'components/Zoom/Zoom';
import ErrorMessage404 from 'components/ErrorMessage404/ErrorMessage404';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import RteText from 'components/RteText/RteText';
import { useTheme } from 'emotion-theming';
import LayoutInner from 'components/LayoutInner/LayoutInner';

const Sermon = () => {
    const { sermonId, date } = useParams();
    const { data: externalDay, status: externalDayStatus } = useExternalDay(date);
    const { sermons } = externalDay || {};
    const sermon = sermons?.find((sermon) => sermon.id === sermonId);

    const theme = useTheme();

    return (
        <LayoutInner>
            {externalDayStatus === 'loading' ? (
                <Loader />
            ) : externalDayStatus === 'error' ? (
                <ErrorMessage500 />
            ) : !sermon ? (
                <ErrorMessage404 />
            ) : (
                <>
                    <div
                        className={css`
                            font-weight: bold;
                            margin-bottom: 12px;
                        `}
                    >
                        {sermon.authorName}
                    </div>
                    <h3
                        className={css`
                            color: ${theme.colours.primary};
                            margin-bottom: 12px;
                            font-size: 30px;
                        `}
                    >
                        {sermon.title}
                    </h3>
                    <p
                        className={css`
                            color: ${theme.colours.gray};
                            margin-bottom: 12px;
                            line-height: 1.5;
                        `}
                    >
                        {sermon.teaser}
                    </p>
                    <Zoom>
                        <RteText html={sermon.bodytext} />
                    </Zoom>
                </>
            )}
        </LayoutInner>
    );
};
export default Sermon;
