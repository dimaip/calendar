const lib = require('./lib.js');
const parse = require('./parse.js');

const dates = lib.generateDatesArray(new Date('2016-01-01'), new Date('2017-01-01'));

dates.map(dateString => parse(dateString));
