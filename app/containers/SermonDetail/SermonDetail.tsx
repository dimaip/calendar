import React from 'react';
import { useParams } from 'react-router-dom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import LayoutInner from 'components/LayoutInner/LayoutInner';
import Loader from 'components/Loader/Loader';
import ErrorMessage404 from 'components/ErrorMessage404/ErrorMessage404';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import RteText from 'components/RteText/RteText';
import Zoom from 'components/Zoom/Zoom';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import useSermon from 'hooks/useSermon';
import { SermonList } from 'components/SermonList/SermonList';
import SolidSection from 'components/SolidSection/SolidSection';

const SermonDetail = () => {
    const { sermonId } = useParams();
    const { data: sermon, status } = useSermon(sermonId);
    const theme = useTheme();

    useDocumentTitle(sermon ? `${sermon.title} - ${sermon.authorName} - Проповеди` : 'Проповедь');

    return (
        <LayoutInner backLink="/sermons">
            {status === 'loading' ? (
                <Loader />
            ) : status === 'error' ? (
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

                    <div
                        className={css`
                            margin-top: 32px;
                            margin-left: -18px;
                            margin-right: -18px;
                        `}
                    >
                        <SolidSection paddingTop={18} marginHorizontal={0} noBorder>
                            <h3 style={{ fontWeight: 'bold', fontSize: 20 }}>Другие проповеди этого автора</h3>
                        </SolidSection>
                        <SermonList authorId={sermon.authorId} limit={5} />
                    </div>
                </>
            )}
        </LayoutInner>
    );
};

export default SermonDetail;
