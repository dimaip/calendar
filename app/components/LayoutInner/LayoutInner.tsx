import React, { useRef, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import Header from 'components/Header/Header';
import DotsMenu from 'components/DotsMenu/DotsMenu';
import { useUpdateTOC } from 'hooks/useUpdateTOC';
import Share from 'components/Share/Share';
import useDay from 'hooks/useDay';
import Button from 'components/Button/Button';
import { useRecoilState } from 'recoil';
import menuShownState from 'state/menuShownState';
import SettingsButton from 'components/SettingsButton/SettingsButton';
import { FindInPageButton } from 'components/FindInPageButton/FindInPageButton';
import InPageSearch from 'components/InPageSearch/InPageSearch';

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
    const { date } = useParams();
    const dayQuery = useDay(date);
    const day = dayQuery.data;
    const history = useHistory();
    useUpdateTOC();
    const backLinkEffective = backLink || history.location.state?.backLink || backLinkFallback;

    const [menuShown, setMenuShown] = useRecoilState(menuShownState);

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
                        <SettingsButton />
                        <FindInPageButton onOpen={() => setIsFindOpen(true)} />

                        <Share
                            title="Православное богослужение на русском языке"
                            text={day?.title}
                            url={window.location.href}
                        />
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
            {isFindOpen && <InPageSearch containerRef={contentRef} onClose={() => setIsFindOpen(false)} />}
        </div>
    );
};
export default LayoutInner;
