import books from './../constants/books.js';

export const bookKeyByShortName = shortName =>
  books.find(i =>
    i.shortName.split(' ').indexOf(shortName.replace(/\s+/g, '')) !== -1
  ).key;

export const bookFullNameByKey = key =>
  books.find(i => i.key === key).fullName;
