import deromanize from 'deromanize';
import {bookKeyByShortName} from './books';

const preParse = v => {
  return v
    .replace(/,.*?зач\.(\s\(от полу́\))?,/, '') // remove зач.
    .replace(/\.$/, '') // remove last dot
    .replace(/(\d{1,3}),(\s\d{1,3})/g, '$1;$2'); // 37-52, 12-15 => 37-52; 12-15
};

// Expand verses and group by chapter
const normalize = segments => {
  const res = {};
  segments.map(element => {
    if (!element[1]) { // if just a single verse
      res[element[0][0]] = res[element[0][0]] ? res[element[0][0]] : [];
      res[element[0][0]].push([element[0][1], element[0][1]]);
    } else if (element[0][0] === element[1][0]) { // if does not span multiple chapters
      res[element[0][0]] = res[element[0][0]] ? res[element[0][0]] : [];
      res[element[0][0]].push([element[0][1], element[1][1]]);
    } else {
      res[element[0][0]] = res[element[0][0]] ? res[element[0][0]] : [];
      res[element[0][0]].push([element[0][1], null]);
      res[element[1][0]] = res[element[1][0]] ? res[element[1][0]] : [];
      res[element[1][0]].push([1, element[1][1]]);
    }
  });
  return res;
};

const verseParse = v => {
  const [bookKey, preParsedVerse] = preParse(v).split('.');
  let savedChapter = null;
  const segments = preParsedVerse.split(';').map(verseRange => { // 'II, 23 - III, 5' => array
    return verseRange.split('-').map(vv => {
      const [firstPart, secondPart] = vv.split(',');
      if (!savedChapter && !secondPart) {
        throw new Error('Chapter not defined!');
      }
      const chapter = secondPart ? firstPart : savedChapter;
      const verseNumber = secondPart ? secondPart : firstPart;
      savedChapter = chapter;
      return [
        deromanize(chapter.trim()),
        Number(verseNumber.trim())
      ];
    });
  });
  return {
    bookKey: bookKeyByShortName(bookKey),
    segments: normalize(segments)
  };
};

export default verseParse;
