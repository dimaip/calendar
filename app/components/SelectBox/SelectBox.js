import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const SelectBox = ({ className = '', items, value, onChange, maxLength = 0 }) => {
    const theme = useTheme();
    return (
        <select
            className={
                css`
                    border-radius: 5px;
                    padding: 8px 6px;
                    text-align: center;
                    background: ${theme.colours.bgGrayDark};
                    font-size: 13px;
                    line-height: 1.2;
                    color: ${theme.colours.darkGray};
                    margin-right: 6px;

                    display: inline-block;
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
                ` +
                ' ' +
                className
            }
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            {items.map(item => {
                let truncatedLabel = item.label;
                if (maxLength && truncatedLabel.length > maxLength) {
                    truncatedLabel = truncatedLabel.substring(0, maxLength) + '…';
                }
                console.log(maxLength);
                return (
                    <option key={item.value} value={item.value}>
                        {truncatedLabel}
                    </option>
                );
            })}
        </select>
    );
};
export default SelectBox;
