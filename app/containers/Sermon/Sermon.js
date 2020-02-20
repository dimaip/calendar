import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import getTheme from 'styles/theme';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import useExternalDay from 'hooks/useExternalDay';
import useDay from 'hooks/useDay';
import Zoom from 'components/Zoom/Zoom';

const Sermon = () => {
    const { sermonId, date } = useParams();
    const day = useDay();
    const { sermons } = useExternalDay() || {};
    const sermon = sermons?.find(sermon => sermon.id === sermonId);

    const theme = getTheme(day?.colour);

    if (!sermon) {
        return <Loader />;
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
                        <div
                            dangerouslySetInnerHTML={{ __html: sermon.bodytext }}
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
export default Sermon;
