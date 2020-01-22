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
    let translationCurrentName;

    const perevodItems = reading.translationList.map((item, i) => {
        if (item.id == reading.translationCurrent) translationCurrentName = item.name;

        return (
            <button
                // onClick={this.handlePerevodItemClick(item.id)}
                key={item.id}
            >
                {item.name}
            </button>
        );
    });

    const translationSelector = (
        <div>
            <div>Перевод {translationCurrentName}</div>
            {perevodItems}
        </div>
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
                                                    font-size: 14px;
                                                    color: ${theme.colors.gray};
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
                `}
            >
                <em>{type}</em>
                <div
                    className={css`
                        font-size: 18px;
                        font-weight: bold;
                        color: ${theme.colors.darkGray};
                        line-height: 1.5;
                        margin-bottom: 12px;
                    `}
                >
                    {readingVerse}
                </div>
            </div>
            {readingText}
        </div>
    );
};
export default ReadingItem;
