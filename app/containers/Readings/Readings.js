import React, { useEffect } from 'react';
import Header from 'components/Header/Header';
import { useParams, Link } from 'react-router-dom';
import LeftIcon from 'components/LeftIcon/LeftIcon';
import { css } from 'emotion';
import theme from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import getDay from 'redux/actions/getDay';
import Loader from 'components/Loader/Loader';
import ReadingsForService from './ReadingsForService';

const Readings = () => {
    const { service, date } = useParams();
    const days = useSelector(state => state?.days?.days);
    const day = days[date];
    const dispatch = useDispatch();
    useEffect(() => {
        if (!day) {
            dispatch(getDay(date));
        }
    }, []);
    const readingsForService = day?.readings?.[service];

    return (
        <div>
            <Header />
            <div
                className={css`
                    display: flex;
                    align-items: center;
                `}
            >
                <div
                    className={css`
                        position: absolute;
                    `}
                >
                    <Link to="/" title="Назад">
                        <div
                            className={css`
                                padding: 18px;
                            `}
                        >
                            <LeftIcon />
                        </div>
                    </Link>
                </div>
                <h2
                    className={css`
                        color: ${theme.colors.primary};
                        flex-grow: 1;
                        font-size: 30px;
                        line-height: 1.5;
                        text-align: center;
                        padding: 9px;
                    `}
                >
                    {service}
                </h2>
            </div>
            {Boolean(day) ? (
                <div
                    className={css`
                        padding: 0 18px;
                    `}
                >
                    <ReadingsForService readingsForService={readingsForService} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};
export default Readings;
