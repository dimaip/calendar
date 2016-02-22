import deromanize from 'deromanize';

const preParse = v => {
  return v
    .replace(/,.*?зач.,/, '') // remove зач.
    .replace(/\.$/, '') // remove last dot
    .replace(/(\d{1,3}),(\s\d{1,3})/g, '$1;$2'); // 37-52, 12-15 => 37-52; 12-15
};

const verseParse = v => {
  const [bookKey, preParsedVerse] = preParse(v).split('.');
  let savedChapter = null;
  const verseArray = preParsedVerse.split(';').map(verseRange => { // 'II, 23 - III, 5' => array
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
  return {bookKey, verseArray};
};

export default verseParse;
