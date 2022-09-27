import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useSelect } from 'downshift';
import Loader from 'components/Loader/Loader';

const SelectBox = ({ className = '', items, value, onChange }) => {
    const theme = useTheme();
    const selectedItem = items.find((i) => i.value === value) || items[0];

    const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
        selectedItem,
        items,
        onSelectedItemChange: (i) => onChange(i.selectedItem.value),
    });

    return (
        <div>
            <button
                aria-label="меню"
                className={`${css`
                    border-radius: 5px;
                    padding: 8px 6px;
                    text-align: center;
                    background: ${theme.colours.bgGray};
                    font-size: 14px;
                    line-height: 1.1;
                    color: ${theme.colours.darkGray};
                    margin-right: 6px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

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
                `} ${className}`}
                type="button"
                {...getToggleButtonProps()}
            >
                <span>{items?.length ? selectedItem?.label : <Loader width={16} />}</span>
            </button>
            <div {...getMenuProps()}>
                {isOpen && (
                    <div
                        className={css`
                            overflow: scroll;
                            max-height: 90vh;
                            max-width: 450px;
                            background: ${theme.colours.bgGrayLight};
                            position: absolute;
                            border: 1px solid ${theme.colours.lineGray};
                            border-radius: 8px;
                            @media (max-width: 450px) {
                                left: 0;
                            }
                        `}
                    >
                        {items.map((item, index) => (
                            <div
                                className={css`
                                    padding: 6px 12px;
                                    padding-left: ${item.level === 3 ? 24 : 12}px;
                                    font-weight: ${selectedItem === item ? 'bold' : 'normal'};
                                    background-color: ${highlightedIndex === index
                                        ? theme.colours.bgGray
                                        : 'transparent'};
                                    border-top: ${item.level === 2 ? `1px solid ${theme.colours.lineGray}` : ''};
                                `}
                                key={`${item.value}${index}`}
                                {...getItemProps({ item, index })}
                            >
                                <div
                                    className={
                                        item.level === 2
                                            ? css`
                                                  text-transform: uppercase;
                                                  font-size: 14px;
                                                  font-weight: bold;
                                                  color: ${theme.colours.primary};
                                                  margin-top: 8px;
                                              `
                                            : ''
                                    }
                                >
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default SelectBox;
