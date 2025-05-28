import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import Header from 'components/Header/Header';
import DotsMenu from 'components/DotsMenu/DotsMenu';
import { useUpdateTOC } from 'hooks/useUpdateTOC';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Share from 'components/Share/Share';
import useDay from 'hooks/useDay';

const LayoutInner = ({
    children,
    backLink = null,
    backLinkFallback = null,
    left = null,
    right = null,
    paddedContent = true,
}: {
    children: React.ReactNode;
    backLink?: string | null;
    backLinkFallback?: string | null;
    left?: React.ReactNode | null;
    right?: React.ReactNode | null;
    paddedContent?: boolean;
}) => {
    const { date } = useParams();
    const dayQuery = useDay(date);
    const day = dayQuery.data;
    const history = useHistory();
    useUpdateTOC();
    const backLinkEffective = backLink || history.location.state?.backLink || backLinkFallback;
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
                    <Link to={backLinkEffective || (date ? `/date/${date}` : '/')} title="Назад">
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
                        <div>
                            <ZoomControlToggle />
                        </div>
                        <Share
                            title="Православное богослужение на русском языке"
                            text={day?.title}
                            url={window.location.href}
                        />
                    </DotsMenu>
                </div>
            </Header>
            <div
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
        </div>
    );
};
export default LayoutInner;
