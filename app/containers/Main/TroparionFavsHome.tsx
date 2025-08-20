import Loader from 'components/Loader/Loader';
import useHymns from 'hooks/useHymns';
import React from 'react';
import { useRecoilState } from 'recoil';
import troparionFavsState from 'state/troparionFavsState';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { HymnButton } from 'containers/Hymns/HymnButton';
import { useTheme } from 'emotion-theming';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import PlusIcon from 'components/svgs/PlusIcon';

import SectionHeading from './SectionHeading';

export const TroparionFavsHome = () => {
    const theme = useTheme();
    const [troparionFavs] = useRecoilState(troparionFavsState);
    const { data: hymns, status } = useHymns();
    const favedHymns = hymns?.filter((h) => troparionFavs.includes(h.id)) || [];

    return (
        <>
            {status === 'loading' ? (
                <Loader />
            ) : status === 'error' ? (
                <ErrorMessage500 />
            ) : (
                <>
                    <SectionHeading
                        className={css`
                            padding-top: 24px;
                        `}
                    >
                        Избранные песнопения
                    </SectionHeading>

                    <div>
                        {favedHymns.length > 0 ? (
                            <div style={{ margin: '0 -10px 0 -10px' }}>
                                {favedHymns.map((hymn) => (
                                    <HymnButton hymn={hymn} key={hymn.id} />
                                ))}
                            </div>
                        ) : (
                            <>
                                <p
                                    className={css`
                                        font-size: 14px;
                                        color: ${theme.colours.gray};
                                        margin: 0 0 12px 0;
                                    `}
                                >
                                    Добавьте ваш любимый тропарь в избранное, и он всегда будет отображаться здесь
                                </p>
                            </>
                        )}
                        <Link
                            className={css`
                                cursor: ${'pointer'};
                                user-select: none;
                            `}
                            to={{
                                pathname: `/hymns`,
                            }}
                        >
                            <ButtonBox
                                className={css`
                                    margin: 0 -10px 8px -10px;
                                `}
                            >
                                <div
                                    className={css`
                                        display: flex;
                                        cursor: pointer;
                                    `}
                                >
                                    <div
                                        className={css`
                                            flex-grow: 1;
                                            flex-shrink: 1;
                                        `}
                                    >
                                        <p
                                            className={css`
                                                margin-bottom: -4px;
                                            `}
                                        >
                                            Все песнопения
                                        </p>
                                    </div>
                                    <div
                                        className={css`
                                            flex-grow: 0;
                                            flex-shrink: 0;
                                            display: flex;
                                            align-items: center;
                                        `}
                                    >
                                        <PlusIcon />
                                    </div>
                                </div>
                            </ButtonBox>
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};
