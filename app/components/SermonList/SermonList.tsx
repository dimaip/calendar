import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Loader from 'components/Loader/Loader';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import useFilteredSermons from 'hooks/useFilteredSermons';
import SolidSection from 'components/SolidSection/SolidSection';
import { SermonSmall } from 'components/SermonSmall/SermonSmall';
import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';
import { Sermon } from 'hooks/useFilteredSermons';

const SERMONS_PER_PAGE = 50;

export const SermonList = ({ authorId, themeId, limit }: { authorId?: string; themeId?: string; limit?: number }) => {
    const theme = useTheme() as any;
    const [allSermons, setAllSermons] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data: sermons, status: sermonsStatus, refetch } = useFilteredSermons(
        authorId,
        themeId,
        limit || SERMONS_PER_PAGE,
        limit ? undefined : offset
    );

    const isLoading = sermonsStatus === 'loading' && offset === 0;
    const isError = sermonsStatus === 'error';

    // Reset when filters change
    useEffect(() => {
        setAllSermons([]);
        setOffset(0);
        setHasMore(true);
        setIsLoadingMore(false);
    }, [authorId, themeId, limit]);

    // Update sermons list when data changes
    useEffect(() => {
        if (sermons) {
            if (offset === 0) {
                setAllSermons(sermons);
            } else {
                setAllSermons((prev) => [...prev, ...sermons]);
            }
            setHasMore(sermons.length >= (limit || SERMONS_PER_PAGE));
            setIsLoadingMore(false);
        }
    }, [sermons, offset, limit]);

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        setOffset((prev) => prev + SERMONS_PER_PAGE);
    };

    // Refetch when offset changes
    useEffect(() => {
        if (offset > 0) {
            refetch();
        }
    }, [offset, refetch]);

    const showLoadMore = !limit && hasMore && allSermons.length > 0;

    const displaySermons = limit ? sermons : allSermons;

    return (
        <SolidSection paddingTop={18} marginHorizontal={0} paddingHorizontal={8}>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <ErrorMessage500 />
            ) : displaySermons?.length ? (
                <div>
                    {displaySermons.map((sermon) => (
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
                            font-size: 15px;
                            font-weight: 600;
                        `}
                    >
                        Все проповеди автора
                    </Button>
                </Link>
            )}
            {showLoadMore && (
                <Button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className={css`
                        background-color: ${theme.colours.primary};
                        color: white;
                        width: 100%;
                        border-radius: 8px;
                        margin-top: 12px;
                        margin-bottom: 18px;
                        font-size: 15px;
                        font-weight: 600;
                        opacity: ${isLoadingMore ? 0.6 : 1};
                    `}
                >
                    {isLoadingMore ? 'Загрузка...' : 'Загрузить ещё'}
                </Button>
            )}
        </SolidSection>
    );
};
