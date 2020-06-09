import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import LeftIcon from 'components/svgs/LeftIcon';
import RightIcon from 'components/svgs/RightIcon';
import Button from '../Button/Button.js';
import { useTheme } from 'emotion-theming';
import { subDays, format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const Nav = ({ handleToggleClick, handleClickShift, date }) => {
    const theme = useTheme();
    const dateObj = parseISO(date);
    return (
        <div
            className={css`
                display: flex;
            `}
        >
            <Button
                title="Предыдущий день"
                onClick={handleClickShift('left')}
                className={css`
                    padding-left: 18px;
                    padding-right: 12px;
                `}
            >
                <LeftIcon />
            </Button>
            <Button
                title="Показать календарь"
                onClick={handleToggleClick}
                className={css`
                    flex-grow: 1;
                    margin: 18px 0;
                    text-align: center;
                    padding: 12px 0 !important;
                `}
            >
                <div
                    className={css`
                        color: ${theme.colours.primary};
                        line-height: 1;
                        margin-bottom: 8px;
                        font-size: 21px;
                        @media (min-width: 360px) {
                            font-size: 25px;
                        }
                        @media (min-width: 375px) {
                            font-size: 27px;
                        }
                    `}
                >
                    {format(dateObj, 'd MMMM yyyy, EEEEEE', { locale: ru })}
                </div>
                <div
                    className={css`
                        font-size: 16px;
                        color: ${theme.colours.gray};
                        line-height: 1;
                    `}
                >
                    {format(subDays(dateObj, 13), 'd MMMM', { locale: ru })} по старому стилю
                </div>
            </Button>
            <Button
                title="Следующий день"
                onClick={handleClickShift('right')}
                className={css`
                    padding-left: 12px;
                    padding-right: 18px;
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
