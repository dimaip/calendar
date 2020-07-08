import React, { useEffect, useState, useContext } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Zoom, { ZoomContext } from 'components/Zoom/Zoom';
import useReading from '../../hooks/useReading';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import SelectBox from 'components/SelectBox/SelectBox';
import Button from 'components/Button/Button';
import Swap from 'components/svgs/Swap';
import Cross from 'components/svgs/Cross';

const ReadingItemSingle = ({
    readingVerse,
    defaultTranslation = 'default',
    type,
    isParallel = false,
    toggleParallel = null,
}) => {
    const zoom = useContext(ZoomContext);
    const [translation, setTranslation] = useState(null);
    const { date } = useParams();
    // @ts-ignore
    const { data: reading, status } = useReading(readingVerse, translation || defaultTranslation, date);
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
                min-height: 100%;
            `}
        >
            <div
                className={css`
                    position: sticky;
                    top: ${61 + (24 + (type === 'unnamed' ? 0 : 20)) / (zoom || 1)}px;
                    background-color: white;
                    margin: 0 -17px -12px -17px;
                    padding: 8px 0 8px 17px;
                    z-index: 3;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    overflow: hidden;
                    /* box-shadow: 0px 0px 3px #bbb; */
                `}
            >
                {reading.translationList?.length ? (
                    <div>
                        <SelectBox
                            className={css`
                                width: 100%;
                            `}
                            onChange={value => setTranslation(value)}
                            value={reading.translationCurrent}
                            items={reading.translationList.map(i => ({ label: i.name, value: i.id }))}
                        />
                    </div>
                ) : null}
                {toggleParallel && (
                    <Button
                        title="Параллельный перевод"
                        className={css`
                            padding: 0 12px;
                        `}
                        onClick={toggleParallel}
                    >
                        {isParallel ? <Cross /> : <Swap />}
                    </Button>
                )}
            </div>
            <div
                className={css`
                    margin-top: 8px;
                `}
            >
                <Zoom isBibleParallel={isParallel}>{readingText}</Zoom>
            </div>
        </div>
    );
};
const ComplexReadingItemSingle = ({ readingVerse: complexReadingVerse, ...rest }) => {
    return complexReadingVerse
        .split('~')
        .map(readingVerse => <ReadingItemSingle readingVerse={readingVerse} key={readingVerse} {...rest} />);
};
export default ComplexReadingItemSingle;
