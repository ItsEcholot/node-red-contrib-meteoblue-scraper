const meteoblueScraper = require('./meteoblue-scraper');

// Pass null for usage outside of node red
meteoblueScraper(null, {
    requestUrl: '',
    requestUrlMeteogram: '',
    cookies: 'addparam=true'
});