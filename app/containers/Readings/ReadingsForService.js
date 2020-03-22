import React from 'react';
import forEach from 'lodash.foreach';
import ReadingItem from './ReadingItem';
import isGospel from 'domain/isGospel';

// sort gospel readings last
const sortGospel = (a, b) => {
    const isAGospel = isGospel(a.readingVerse);
    const isBGospel = isGospel(b.readingVerse);
    if (isAGospel && !isBGospel) {
        return 1;
    }
    if (!isAGospel && isBGospel) {
        return -1;
    }
    return 0;
};

const ReadingsForService = ({ readingsForService }) => {
    // flatten readings
    const readingVersesWithType = [];
    forEach(readingsForService, (readingVerses, type) => {
        readingVerses.forEach(readingVerse => {
            readingVersesWithType.push({
                readingVerse,
                type,
            });
        });
    });

    return (
        <>
            {readingVersesWithType.sort(sortGospel).map(({ readingVerse, type }) => (
                <ReadingItem key={readingVerse} readingVerse={readingVerse} type={type} />
            ))}
        </>
    );
};

export default ReadingsForService;
