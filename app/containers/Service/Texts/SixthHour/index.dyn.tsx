import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import { css } from 'emotion';
import useDay from 'hooks/useDay';
import Loader from 'components/Loader/Loader';
import ReadingsForService from 'containers/Readings/ReadingsForService';

import SixthHourMdx from './SixthHour.mdx';

const Readings = ({ readingsForService, day }) =>
    Boolean(day) ? (
        <div
            className={css`
                padding: 0 18px;
            `}
        >
            <ReadingsForService readingsForService={readingsForService} />
        </div>
    ) : (
        <Loader />
    );

const SixthHour = ({ date }): JSX.Element => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const { data: day } = useDay(date);
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const greatLent = day?.fastName === 'Великий пост';

    const readingsForService = day?.readings?.['6-й час'];

    const readings = (
        <>
            <Readings readingsForService={readingsForService} day={day} />
        </>
    );

    const props = { date, isEasterOffsetRange, greatLent, dayOfWeek, day, readings };
    return <SixthHourMdx {...props} />;
};
export default SixthHour;
