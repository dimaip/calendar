import { css } from 'emotion';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';

const CustomPrayer = (): JSX.Element => {
    const { prayerId } = useParams();
    const [customPrayers] = useRecoilState(customPrayersState('Sugubaja'));
    const text = customPrayers?.find((i) => String(i.id) === prayerId)?.text;
    return (
        <div
            className={css`
                white-space: break-spaces;
                margin: 12px 0;
            `}
        >
            {text}
        </div>
    );
};
export default CustomPrayer;
