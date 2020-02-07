import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getDay from 'redux/actions/getDay';

const useDay = () => {
    const { date } = useParams();
    const days = useSelector(state => state?.days);
    const day = days?.[date];
    const dispatch = useDispatch();
    useEffect(() => {
        if (!day) {
            dispatch(getDay(date));
        }
    }, [date]);

    if (day && !day.loading) {
        return day.data;
    }

    return null;
};
export default useDay;
