const lib = require('./lib.js');
const parse = require('./parse.js');
const FS = require('q-io/fs');

const dates = lib.generateDatesArray(new Date('2009-01-14'), new Date('2017-01-14'));

FS.makeTree('cache').then(() =>
  dates.map(dateString => parse(dateString))
);
