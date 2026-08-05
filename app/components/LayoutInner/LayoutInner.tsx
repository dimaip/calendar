import React, { Suspense, useCallback, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { css } from '@emotion/css';

import LeftIcon from 'components/svgs/LeftIcon';
import Header from 'components/Header/Header';
import DotsMenu from 'components/DotsMenu/DotsMenu';
import useDay from 'hooks/useDay';
import Button from 'components/Button/Button';

const LayoutOverflowMenuItems = React.lazy(
    async () =>
        await import(/* webpackChunkName: "layout-overflow-menu" */ 'components/LayoutInner/LayoutOverflowMenuItems')
);
const InPageSearch = React.lazy(
    async () => await import(/* webpackChunkName: "in-page-search" */ 'components/InPageSearch/InPageSearch')
);

const LayoutInner = ({
    children,
    backLink = null,
    backLinkFallback = null,
    left = null,
    right = null,
    paddedContent = true,
    onBackClick = null,
}: {
    children: React.ReactNode;
    backLink?: string | null;
    backLinkFallback?: string | null;
    left?: React.ReactNode | null;
    right?: React.ReactNode | null;
    paddedContent?: boolean;
    onBackClick?: () => void;
}) => {
    const { date } = useParams<'date'>();
    const dayQuery = useDay(date);
    const day = dayQuery.data;
    const location = useLocation();
    const backLinkEffective = backLink || location.state?.backLink || backLinkFallback;

    const backElement = (
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
    );

    const backButton = onBackClick ? (
        <Button onClick={onBackClick}>{backElement}</Button>
    ) : (
        <Link to={backLinkEffective || (date ? `/date/${date}` : '/')} title="Назад">
            {backElement}
        </Link>
    );
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [isFindOpen, setIsFindOpen] = useState(false);
    const openFind = useCallback(() => setIsFindOpen(true), []);
    const closeFind = useCallback(() => setIsFindOpen(false), []);
    return (
        <div
            className={css`
                z-index: 10;
            `}
        >
            <Header>
                <div
                    className={css`
                        flex-grow: 1;
                        display: flex;
                        align-items: center;
                    `}
                >
                    {backButton}
                    {left}
                </div>
                <div
                    className={css`
                        flex-grow: 0;
                        display: flex;
                    `}
                >
                    {right}
                    <DotsMenu>
                        <Suspense fallback={null}>
                            <LayoutOverflowMenuItems dayTitle={day?.title || ''} onFindOpen={openFind} />
                        </Suspense>
                    </DotsMenu>
                </div>
            </Header>
            <div
                ref={contentRef}
                className={
                    paddedContent
                        ? css`
                              margin-top: 24px;
                              padding: 0 16px 16px 16px;
                          `
                        : ''
                }
            >
                {children}
            </div>
            {isFindOpen && (
                <Suspense fallback={null}>
                    <InPageSearch containerRef={contentRef} onClose={closeFind} />
                </Suspense>
            )}
        </div>
    );
};
export default LayoutInner;
