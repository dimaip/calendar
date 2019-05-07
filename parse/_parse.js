const lib = require('./lib.js');
const parse = require('./parse.js');
const FS = require('q-io/fs');

const dates = lib.generateDatesArray(new Date('2018-01-01'), new Date('2019-01-01'));

FS.makeTree('cache').then(() =>
  dates.map(dateString => parse(dateString))
);
