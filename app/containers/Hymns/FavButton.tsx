import Button from 'components/Button/Button';
import Heart from 'components/svgs/Heart';
import React from 'react';
import { useRecoilState } from 'recoil';
import troparionFavsState from 'state/troparionFavsState';

export const FavButton = ({ hymnId }: { hymnId: string }) => {
    const [troparionFavs, setTroparionFavs] = useRecoilState(troparionFavsState);
    const isFaved = troparionFavs.includes(hymnId);
    return (
        <Button
            style={{ padding: 0 }}
            onClick={(e) => {
                setTroparionFavs(isFaved ? troparionFavs.filter((t) => t !== hymnId) : [...troparionFavs, hymnId]);
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Heart isActive={isFaved} />
        </Button>
    );
};
