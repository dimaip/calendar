import Loader from 'components/Loader/Loader';
import useHymns from 'hooks/useHymns';
import React from 'react';
import { useRecoilState } from 'recoil';
import troparionFavsState from 'state/troparionFavsState';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import { css } from 'emotion';
import { HymnButton } from 'containers/Hymns/HymnButton';

import SectionHeading from './SectionHeading';

export const TroparionFavs = (): JSX.Element => {
    const [troparionFavs] = useRecoilState(troparionFavsState);
    const { data: hymns, status } = useHymns();
    const favedHymns = hymns?.filter((h) => troparionFavs.includes(h.id)) || [];

    return (
        <>
            {status === 'loading' ? (
                <Loader />
            ) : status === 'error' ? (
                <ErrorMessage500 />
            ) : favedHymns.length > 0 ? (
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
                        <>
                            {favedHymns.map((hymn) => (
                                <HymnButton hymn={hymn} key={hymn.id} />
                            ))}
                        </>
                    </div>
                </>
            ) : null}
        </>
    );
};
