import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const ServiceSelector = ({ service, services, onChange }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                width: 100%;
                text-align: center;
            `}
        >
            <select
                className={css`
                    /* Adopt to the width of the selected service, kinda hackish... */
                    width: ${service.length * 17 + 25}px;
                    color: ${theme.colours.primary};
                    flex-grow: 1;
                    font-size: 30px;
                    line-height: 1.5;
                    text-align: center;
                    text-align-last: center;
                    margin: 9px auto;

                    display: inline-block;
                    background: white no-repeat;
                    background-position: right 58%;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.268' height='6.832' viewBox='0 0 11.268 6.832'%3E%3Cpath d='M59,233.668H70.269l-5.75-6.832Z' transform='translate(70.269 233.668) rotate(180)' fill='%23AE841A'/%3E%3C/svg%3E");
                    box-sizing: border-box;
                    border: 0;
                    appearance: none;
                    &::-ms-expand {
                        display: none;
                    }
                    &:hover {
                        opacity: 0.8;
                        cursor: pointer;
                    }
                    &:focus {
                        outline: none;
                    }
                    & option {
                        font-weight: normal;
                    }
                `}
                value={service}
                onChange={onChange}
            >
                {services.map(item => {
                    return (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
export default ServiceSelector;
