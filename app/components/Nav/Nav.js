import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import moment from 'moment';
import LeftIcon from '../LeftIcon/LeftIcon';
import RightIcon from '../RightIcon/RightIcon';
import Button from '../Button/Button.js';
import theme from '../../styles/theme';

const Nav = ({ handleToggleClick, handleClickShift, date }) => {
    return (
        <div
            className={css`
                display: flex;
            `}
        >
            <Button
                onClick={handleClickShift('left')}
                className={css`
                    padding-left: 24px;
                    padding-right: 24px;
                `}
            >
                <LeftIcon />
            </Button>
            <Button
                onClick={handleToggleClick}
                className={css`
                    flex-grow: 1;
                    margin: 18px 0;
                    text-align: center;
                `}
            >
                <div
                    className={css`
                        color: ${theme.colors.primary};
                        line-height: 1;
                        margin-bottom: 8px;
                        font-size: 22px;
                        @media (min-width: 360px) {
                            font-size: 26px;
                        }
                        @media (min-width: 375px) {
                            font-size: 28px;
                        }
                    `}
                >
                    {moment(date).format('D MMMM YYYY, ddd')}
                </div>
                <div
                    className={css`
                        font-size: 14px;
                        color: ${theme.colors.gray};
                        line-height: 1;
                    `}
                >
                    {moment(date)
                        .subtract(-13, 'days')
                        .format('D MMMM')}{' '}
                    по старому стилю
                </div>
            </Button>
            <Button
                onClick={handleClickShift('right')}
                className={css`
                    padding-left: 24px;
                    padding-right: 24px;
                `}
            >
                <RightIcon />
            </Button>
        </div>
    );
};
Nav.propTypes = {
    handleToggleClick: PropTypes.func.isRequired,
    handleClickShift: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
};

export default Nav;
