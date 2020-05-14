import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Zoom from 'components/Zoom/Zoom';
import useReading from '../../hooks/useReading';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import SelectBox from 'components/SelectBox/SelectBox';

const ReadingItem = ({ readingVerse, type }) => {
    const [translation, setTranslation] = useState('default');
    const { date } = useParams();
    // @ts-ignore
    const { data: reading, status } = useReading(readingVerse, translation, date);
    const theme = useTheme();

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'error') {
        return <ErrorMessage500 />;
    }

    if (!reading?.fragments) {
        return (
            <div
                className={css`
                    color: ${theme.colours.gray};
                `}
            >
                Отрывок не найден
            </div>
        );
    }

    const readingText = reading.fragments.map((fragment, index) => {
        if (fragment.type != 'hidden') {
            return (
                <div key={fragment.chapter}>
                    {index !== 0 && (
                        <div
                            className={css`
                                margin-bottom: 12px;
                                font-size: 18px;
                                font-weight: bold;
                                color: ${theme.colours.darkGray};
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
                                                font-size: 18px;
                                                line-height: 1.6;
                                                margin-bottom: 12px;
                                                color: ${theme.colours.darkGray};
                                            `}
                                        >
                                            <span
                                                className={css`
                                                    font-size: 12px;
                                                    color: ${theme.colours.gray};
                                                `}
                                            >
                                                {verse.verse}
                                            </span>{' '}
                                            {verse.text.split('\n').map((text, index) => (
                                                <span key={index}>
                                                    {text}
                                                    <br />
                                                </span>
                                            ))}
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
                    margin: 0 -17px;
                    padding: 8px 17px;
                    /* z-index: 3; */
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    /* box-shadow: 0px 0px 3px #bbb; */
                `}
            >
                <div
                    className={css`
                        margin-bottom: 6px;
                        margin-right: 6px;
                    `}
                >
                    {type != 'unnamed' && (
                        <div
                            className={css`
                                font-size: 16px;
                                color: ${theme.colours.gray};
                            `}
                        >
                            {type}
                        </div>
                    )}
                    <div
                        className={css`
                            font-size: 18px;
                            font-weight: bold;
                            color: ${theme.colours.darkGray};
                            line-height: 1.5;
                        `}
                    >
                        {readingVerse.replace('@', '')}
                    </div>
                </div>
                {reading.translationList?.length ? (
                    <div>
                        <SelectBox
                            onChange={value => setTranslation(value)}
                            value={reading.translationCurrent}
                            items={reading.translationList.map(i => ({ label: i.name, value: i.id }))}
                        />
                    </div>
                ) : null}
            </div>
            <Zoom>{readingText}</Zoom>
        </div>
    );
};
const ComplexReadingItem = ({ readingVerse: complexReadingVerse, type }) => {
    return complexReadingVerse
        .split('~')
        .map(readingVerse => <ReadingItem readingVerse={readingVerse} key={readingVerse} type={type} />);
};
export default ComplexReadingItem;
