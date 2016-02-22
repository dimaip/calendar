const lib = require('./lib.js');
const parse = require('./parse.js');

const dates = lib.generateDatesArray(new Date('2009-01-14'), new Date('2017-01-14'));

dates.map(dateString => parse(dateString));
