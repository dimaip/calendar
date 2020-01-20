'use strict';

const FS = require('q-io/fs');
const ini = require('ini');
const path = require('path');
const iconv = require('iconv-lite');
const books = require('./books.json');

const writeFile = (filePath, content) =>
    FS.makeTree(path.dirname(filePath))
        .then(() => FS.write(filePath, content))
        .catch(e => console.log(e));

const parseVerseContent = verse =>
    verse
        .replace(/<\/p>/g, '')
        .replace(/\s+\d{1,6}/g, '')
        .replace(/\s+/g, ' ');

const parseChapterContent = (chapterContent, verseSign) =>
    chapterContent
        .split(verseSign)
        .slice(1)
        .filter(i => i && i.trim())
        .map(vvv => {
            try {
                const splitVerse = vvv.split(/^(\d{1,3})[\.,]?\s/).slice(1);
                if (!splitVerse[1]) {
                    throw new Error(`verseContent not parsed in (${vvv})`);
                }
                return splitVerse[1]
                    ? {
                          verse: splitVerse[0],
                          content: parseVerseContent(splitVerse[1]),
                      }
                    : null;
            } catch (e) {
                console.log(e);
                return null;
            }
        });

const parseBookContent = (bookContent, translationKey, bookKey, chapterSign, verseSign) =>
    bookContent
        .split(new RegExp(chapterSign))
        .slice(1)
        .filter(i => i)
        .map(vv => {
            try {
                const [chapterNumber, chapterContent] = vv.split(/(\d{1,3}?)<[^>]+?>/).slice(1);
                if (!chapterContent) {
                    throw new Error(
                        `chapterContent not parsed in (${vv}) - ${translationKey}/${bookKey}/${chapterNumber}`
                    );
                }
                const chapterArray = parseChapterContent(chapterContent, verseSign);
                writeFile(
                    `new/${translationKey}/${bookKey}/${chapterNumber}.json`,
                    JSON.stringify(chapterArray, null, 2)
                );
            } catch (e) {
                console.log(e);
                return null;
            }
        });

const _getBookKeyByFullName = fullName => Array.find(books, i => i.fullName === fullName);

const convert = translationKey => {
    let i = 0;
    FS.read(`bible/${translationKey}/bibleqt.ini`, 'b')
        .then(v => iconv.decode(v, 'win1251'))
        .then(v =>
            v.replace(/PathName/g, () => {
                i++;
                return `[${i}]\nPathName`;
            })
        )
        .then(v => ini.parse(v))
        .then(v => {
            const chapterSign = v.ChapterSign;
            const verseSign = v.VerseSign;
            Object.keys(v).map(i => {
                const pathName = v[i].PathName;
                if (pathName) {
                    const book = _getBookKeyByFullName(v[i].FullName);
                    if (book && book.key) {
                        FS.read(`bible/${translationKey}/${pathName}`, 'b')
                            .then(v => iconv.decode(v, 'win1251'))
                            .then(v => v.replace(/\n/g, ''))
                            .then(v => parseBookContent(v, translationKey, book.key, chapterSign, verseSign))
                            .catch(e => console.log(e));
                    } else {
                        throw new Error(`BookKey for ${v[i].FullName} - ${translationKey} not resolved`);
                    }
                }
            });
        })
        .catch(e => console.log(e));
};

['1Aver', '2Kass', '3RBO2011', '4RST'].map(i => convert(i));
