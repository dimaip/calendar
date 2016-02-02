const lib = require('./lib.js');
const scrape = require('./scrape.js');

const dates = lib.generateDatesArray(new Date('2016-12-30'), new Date('2017-01-01'));

const RateLimiter = require('limiter').RateLimiter;
const limiter = new RateLimiter(1, 1000);
dates.map(dateString => limiter.removeTokens(1, () => scrape(dateString)));
