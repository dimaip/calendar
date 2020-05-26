import React from 'react';
import { useParams, Link } from 'react-router-dom';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Header from 'components/Header/Header';

const LayoutInner = ({ children, left = null, right = null, backLink = null, paddedContent = true }) => {
    const { date } = useParams();
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
                    <Link to={backLink || `/date/${date}`} title="Назад">
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
                        margin-right: 12px;
                    `}
                >
                    {right}
                    <ZoomControlToggle />
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
