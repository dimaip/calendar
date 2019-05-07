const lib = require('./lib.js');
const scrape = require('./scrape.js');
const FS = require('q-io/fs');

const dates = lib.generateDatesArray(new Date('2018-01-01'), new Date('2019-01-01'));

const RateLimiter = require('limiter').RateLimiter;
const limiter = new RateLimiter(1, 1000);

FS.makeTree('raw').then(() =>
  dates.map(dateString => limiter.removeTokens(1, () => scrape(dateString)))
);
