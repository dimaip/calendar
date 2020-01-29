import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getDay from 'redux/actions/getDay';

const useDay = () => {
    const { date } = useParams();
    const days = useSelector(state => state?.days?.days);
    const day = days[date];
    const dispatch = useDispatch();
    useEffect(() => {
        if (!day) {
            dispatch(getDay(date));
        }
    }, []);
    return day;
};
export default useDay;
