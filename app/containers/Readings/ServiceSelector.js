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
                    width: ${service.length * 17 + 30}px;
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
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13.668 8.823' width='13.668'%3E%3Cg stroke-width='2' stroke='%23ae841a' stroke-linecap='round' stroke-linejoin='round' fill='none'%3E%3Cpath d='M6.84 7.411L1.413 1.413M6.829 7.411l5.427-5.998'/%3E%3C/g%3E%3C/svg%3E");
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
                        opacity: 0.8;
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
