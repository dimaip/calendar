import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getExternalDay from 'redux/actions/getExternalDay';

const useExternalDay = () => {
    const { date } = useParams();
    const externalDays = useSelector(state => state?.externalDays);
    const externalDay = externalDays?.[date];
    const dispatch = useDispatch();
    useEffect(() => {
        if (!externalDay) {
            dispatch(getExternalDay(date));
        }
    }, [date]);

    if (externalDay && !externalDay.loading) {
        return externalDay.data;
    }

    return null;
};
export default useExternalDay;
