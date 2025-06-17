import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useSelect } from 'downshift';
import Loader from 'components/Loader/Loader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { truncateText } from 'utils/truncateText';
import { truthy } from 'utils/truthy';
import Cross from 'components/svgs/Cross';

const SelectBox = React.memo(
    ({
        className = '',
        items,
        value,
        onChange,
        inverse = false,
        showChevron = false,
        heighlightActive = false,
        activeOnTop = false,
        title = '',
    }: {
        className?: string;
        items: Array<{ label: string; shortLabel: string; value: string; level?: number }>;
        value: string;
        onChange: (value: string) => void;
        inverse?: boolean;
        showChevron?: boolean;
        heighlightActive?: boolean;
        activeOnTop?: boolean;
        title?: string;
    }) => {
        const theme = useTheme();
        const selectedItem = items.find((i) => i.value === value) || items[0];
        const processedItems = activeOnTop
            ? [selectedItem, ...items.filter((i) => i.value !== value)].filter(truthy)
            : items;
        const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps, reset } = useSelect({
            selectedItem,
            items: processedItems,
            onSelectedItemChange: (i) => {
                setTimeout(() => onChange(i.selectedItem.value), 0);
            },
            onIsOpenChange: (e) => {
                window.pullDownDisabled = e.isOpen;
            },
        });

        return (
            <div>
                <button
                    aria-label="меню"
                    className={`${css`
                        border-radius: 5px;
                        padding: 8px 6px;
                        text-align: center;
                        background: ${heighlightActive && selectedItem.value
                            ? theme.colours.primary
                            : inverse
                            ? theme.colours.white
                            : theme.colours.bgGray};
                        font-size: 14px;
                        line-height: 1.1;
                        color: ${heighlightActive && selectedItem.value ? theme.colours.white : theme.colours.darkGray};
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
                    <span>
                        {items?.length ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {truncateText(selectedItem?.shortLabel || selectedItem?.label || '', 17)}{' '}
                                {showChevron &&
                                    (isOpen ? (
                                        <ExpandLess style={{ fontSize: '1rem', marginLeft: 3 }} />
                                    ) : (
                                        <ExpandMore style={{ fontSize: '1rem', marginLeft: 3 }} />
                                    ))}
                            </div>
                        ) : (
                            <Loader width={16} />
                        )}
                    </span>
                </button>
                {ReactDOM.createPortal(
                    <div {...getMenuProps()}>
                        {isOpen && (
                            <div
                                className={css`
                                    overflow: scroll;
                                    background: ${theme.colours.bgGrayLight};
                                    border: 1px solid ${theme.colours.lineGray};

                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    width: 100vw;
                                    height: 100vh;
                                    z-index: 10000;
                                `}
                            >
                                {title && (
                                    <div
                                        className={css`
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                            height: 48px;
                                            overflow: hidden;

                                            padding: 12px;
                                            background-color: ${theme.colours.bgGray};

                                            @media (min-width: 451px) {
                                                display: none;
                                            }
                                        `}
                                    >
                                        <h3
                                            className={css`
                                                color: ${theme.colours.black};
                                                font-size: 20px;
                                            `}
                                        >
                                            {title}
                                        </h3>
                                        <div onClick={() => reset()}>
                                            <Cross />
                                        </div>
                                    </div>
                                )}
                                {processedItems.map((item, index) => (
                                    <div
                                        className={css`
                                            padding: ${item.level === 2
                                                ? '12px 12px 0 12px'
                                                : !item.level
                                                ? '12px'
                                                : '6px 12px'};
                                            padding-left: ${item.level === 3 ? 24 : 12}px;
                                            color: ${highlightedIndex === index ? theme.colours.primary : 'inherit'};
                                            border-top: ${item.level === 2 || !item.level
                                                ? `1px solid ${theme.colours.lineGray}`
                                                : ''};
                                            margin-bottom: ${item.level === 3 && items[index + 1]?.level === 2
                                                ? '8px'
                                                : '0px'};
                                        `}
                                        key={`${item.value}${index}`}
                                        {...getItemProps({ item, index })}
                                    >
                                        <div
                                            className={`${
                                                item.level === 2
                                                    ? css`
                                                          text-transform: uppercase;
                                                          font-size: 14px;
                                                          font-weight: bold;
                                                          color: ${theme.colours.primary};
                                                          margin-top: 4px;
                                                          margin-bottom: 4px;
                                                      `
                                                    : ''
                                            } ${css`
                                                display: block;
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            `}`}
                                        >
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>,
                    document.getElementById('react-portal')
                )}
            </div>
        );
    }
);
export default SelectBox;
