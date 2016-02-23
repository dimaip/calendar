'use strict';

const FS = require('q-io/fs');
const ini = require('ini');
const path = require('path');
const iconv = require('iconv-lite');

const writeFile = (filePath, content) => FS.makeTree(path.dirname(filePath))
	.then(() => FS.write(filePath, content))
	.catch(e => console.log(e));

const parseChapterContent = (chapterContent, verseSign) => chapterContent.split(`${verseSign}>`).filter(i => i).map(vvv => {
	const splitVerse = vvv.split(/^(\d{1,3})\s/);
	if (splitVerse[2]) {
		return {
			verse: splitVerse[1],
			content: splitVerse[2]
		};
	}
});

const parseBookContent = (bookContent, translationKey, bookKey, chapterSign, verseSign) => bookContent.split(new RegExp(`${chapterSign}>`)).filter(i => i).map(vv => {
	const [, chapterNumber, chapterContent] = vv.split(/(\d{1,3}?)<[^>]+?>/);
	const chapterArray = parseChapterContent(chapterContent, verseSign);
	writeFile(`new/${translationKey}/${bookKey}/${chapterNumber}.json`, JSON.stringify(chapterArray, null, 2));
});

const convert = translationKey => {
	let i = 0;
	FS.read(`bible/${translationKey}/bibleqt.ini`)
		.then(v => v.replace(/PathName/g, () => {
			i++;
			return `[${i}]\nPathName`;
		}))
		.then(v => ini.parse(v))
		.then(v => {
			const chapterSign = v.ChapterSign;
			const verseSign = v.VerseSign;
			Object.keys(v).map(i => {
				const pathName = v[i].PathName;
				if (pathName) {
					FS.read(`bible/${translationKey}/${pathName}`, 'b')
						.then(v => iconv.decode(v, 'win1251'))
						.then(v => v.replace(/\n/g, ''))
						.then(v => parseBookContent(v, translationKey, pathName, chapterSign, verseSign))
						.catch(e => console.log(e));
				}
			});
		})
		.catch(e => console.log(e));
};

['1Aver', '2Kass', '3RBO2011', '4RST', '5BHS', '6NA28', '7NET'].map(i => convert(i));
