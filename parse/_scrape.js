const lib = require('./lib.js');
const scrape = require('./scrape.js');

const dates = lib.generateDatesArray(new Date('2009-01-14'), new Date('2017-01-14'));

const RateLimiter = require('limiter').RateLimiter;
const limiter = new RateLimiter(1, 1000);
dates.map(dateString => limiter.removeTokens(1, () => scrape(dateString)));
