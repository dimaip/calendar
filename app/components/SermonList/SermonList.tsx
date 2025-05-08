import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Loader from 'components/Loader/Loader';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import useFilteredSermons from 'hooks/useFilteredSermons';
import SolidSection from 'components/SolidSection/SolidSection';
import { SermonSmall } from 'components/SermonSmall/SermonSmall';
import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';

export const SermonList = ({ authorId, themeId, limit }: { authorId?: string; themeId?: string; limit?: number }) => {
    const theme = useTheme();

    const { data: sermons, status: sermonsStatus } = useFilteredSermons(authorId, themeId, limit);

    const isLoading = sermonsStatus === 'loading';
    const isError = sermonsStatus === 'error';

    return (
        <SolidSection paddingTop={18} marginHorizontal={0}>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <ErrorMessage500 />
            ) : sermons?.length ? (
                <div>
                    {sermons.map((sermon) => (
                        <SermonSmall key={sermon.id} sermon={sermon} />
                    ))}
                </div>
            ) : (
                <p
                    className={css`
                        color: ${theme.colours.gray};
                        font-style: italic;
                    `}
                >
                    Проповеди не найдены
                </p>
            )}
            {limit && (
                <Link to={`/sermons/${authorId}`}>
                    <Button
                        className={css`
                            background-color: ${theme.colours.primary};
                            color: white;
                            width: 100%;
                            border-radius: 8px;
                            margin-top: 12px;
                            margin-bottom: 18px;
                        `}
                    >
                        Все проповеди автора
                    </Button>
                </Link>
            )}
        </SolidSection>
    );
};
