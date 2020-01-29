import React, { useEffect } from 'react';
import { css } from 'emotion';
import theme from 'styles/theme';
import getReading from 'redux/actions/getReading';
import { useDispatch, useSelector } from 'react-redux';

const ReadingItem = ({ readingVerse, type }) => {
    const readings = useSelector(state => state?.readings?.readings);
    const dispatch = useDispatch();
    const reading = readings[readingVerse];
    useEffect(() => {
        if (!reading) {
            dispatch(getReading(readingVerse, 'default'));
        }
    }, []);

    if (!reading?.fragments) {
        return <div>Отрывок не найден</div>;
    }

    const translationSelector = (
        <select
            className={css`
                display: block;
                font-size: 14px;
                color: ${theme.colors.gray};
                line-height: 1;
                padding: 6px 22px 6px 12px;
                width: 100%;
                box-sizing: border-box;
                margin: 0;
                border: 0;
                border-radius: 10px;
                appearance: none;
                background-color: ${theme.colors.bgGray};
                background-position: top 10px right 8px;
                background-repeat: no-repeat;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.268' height='6.832' viewBox='0 0 11.268 6.832'%3E%3Cpath d='M59,233.668H70.269l-5.75-6.832Z' transform='translate(70.269 233.668) rotate(180)' fill='%23A2A2A2'/%3E%3C/svg%3E");
                &::-ms-expand {
                    display: none;
                }
                &:hover {
                    opacity: 0.8;
                    cursor: pointer;
                }
                &:focus {
                    border-color: #aaa;
                    box-shadow: 0 0 3px 1px ${theme.colors.primary};
                    box-shadow: 0 0 0 1px -moz-mac-focusring;
                    color: ${theme.colors.darkGray};
                    outline: none;
                }
                & option {
                    font-weight: normal;
                }
            `}
            value={reading.translationCurrent}
            onChange={e => dispatch(getReading(readingVerse, e.target.value))}
        >
            {reading.translationList.map((item, i) => {
                return (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                );
            })}
        </select>
    );

    const readingText = reading.fragments.map((fragment, index) => {
        if (fragment.type != 'hidden') {
            return (
                <div key={fragment.chapter}>
                    {index !== 0 && (
                        <div
                            className={css`
                                margin-bottom: 12px;
                                font-weight: bold;
                                color: ${theme.colors.darkGray};
                            `}
                        >
                            Глава {fragment.chapter}
                        </div>
                    )}
                    {fragment.verses
                        ?.map(verse => {
                            return (
                                <div key={verse.verse}>
                                    {verse.type !== 'hidden' && (
                                        <div
                                            className={css`
                                                margin-bottom: 12px;
                                                color: ${theme.colors.darkGray};
                                            `}
                                        >
                                            <span
                                                className={css`
                                                    font-size: 16px;
                                                    color: ${theme.colors.darkGray};
                                                `}
                                            >
                                                {verse.verse}
                                            </span>{' '}
                                            {verse.text}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                        .filter(Boolean)}
                </div>
            );
        }
    });

    return (
        <div
            className={css`
                margin-bottom: 24px;
            `}
        >
            <div
                className={css`
                    position: sticky;
                    top: 0;
                    background-color: white;
                    display: flex;
                    padding: 8px 0;
                `}
            >
                <div
                    className={css`
                        flex-grow: 1;
                    `}
                >
                    <div
                        className={css`
                            font-size: 14px;
                            color: ${theme.colors.gray};
                        `}
                    >
                        {type}
                    </div>
                    <div
                        className={css`
                            font-size: 18px;
                            font-weight: bold;
                            color: ${theme.colors.darkGray};
                            line-height: 1.5;
                        `}
                    >
                        {readingVerse}
                    </div>
                </div>
            </div>
            <div
                className={css`
                    margin-bottom: 12px;
                `}
            >
                {translationSelector}
            </div>

            {readingText}
        </div>
    );
};
export default ReadingItem;
