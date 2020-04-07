import React from 'react';
import PropTypes from 'prop-types';
import ReadingItem from './ReadingItem';

const ReadingGroup = ({type, readingVerses}) => {
  var items = [];

  readingVerses.map((readingVerse, i) => {
    //get ";" indexes for multi-book verse - for example: Мф., 107 зач., XXVI, 2-20; Ин., XIII, 3-17; Мф., X…1-39; Лк., XXII, 43-45; Мф., XXVI, 40 - XXVII, 2.
    const
      verses = [],
      complexVerseIndexes = Array.from(readingVerse.matchAll(/(;)\s+(?:(?:[^0-9XIV .]+\.(?:\s[^0-9XIV ]+\.)?|[0-9]\s+[^0-9XIV ]+?\.)).+?/g)).map(item => {
        return item.index;
      });

    if (complexVerseIndexes.length > 0) {
      // slice verses by ";" position
      complexVerseIndexes.map((idx, i) => {
        if (i === 0) {
          verses.push(readingVerse.slice(0, idx))
        }
        verses.push(
          i < complexVerseIndexes.length - 1
            ? readingVerse.slice(idx, complexVerseIndexes[i + 1]).replace(/^;\s*/, '')
            : readingVerse.slice(idx).replace(/^;\s*/, '')
        )
      });
    } else {
      verses.push(readingVerse);
    }

    verses.map((item, ii) => {
      items.push(<ReadingItem readingVerse={item} key={`${i}_${ii}_${item}`} type={type}/>)
    })
  });

  if(items.length>0) {
    return (<>
        {items}
      </>
    );
  } else {
    return '';
  }

};
ReadingGroup.propTypes = {
  type: PropTypes.string,
  readingVerses: PropTypes.array.isRequired,
};

export default ReadingGroup;