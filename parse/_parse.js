const lib = require('./lib.js');
const parse = require('./parse.js');
const FS = require('q-io/fs');

const dates = lib.generateDatesArray(new Date('2017-09-10'), new Date('2017-09-12'));

FS.makeTree('cache').then(() =>
  dates.map(dateString => parse(dateString))
);
