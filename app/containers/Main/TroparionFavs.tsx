import Loader from 'components/Loader/Loader';
import useHymns from 'hooks/useHymns';
import React from 'react';
import { useRecoilState } from 'recoil';
import troparionFavsState from 'state/troparionFavsState';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { HymnButton } from 'containers/Hymns/HymnButton';
import Button from 'components/Button/Button';
import { useTheme } from 'emotion-theming';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import PlusIcon from 'components/svgs/PlusIcon';

import SectionHeading from './SectionHeading';

export const TroparionFavs = () => {
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
                            padding-top: 12px;
                        `}
                    >
                        Избранные песнопения
                    </SectionHeading>

                    <div
                        className={css`
                            margin: 0 -10px;
                        `}
                    >
                        {favedHymns.length > 0 ? (
                            <>
                                {favedHymns.map((hymn) => (
                                    <HymnButton hymn={hymn} key={hymn.id} />
                                ))}
                            </>
                        ) : (
                            <>
                                <p
                                    className={css`
                                        font-size: 14px;
                                        color: ${theme.colours.gray};
                                        margin: 0 10px 12px 10px;
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
                            <ButtonBox>
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
