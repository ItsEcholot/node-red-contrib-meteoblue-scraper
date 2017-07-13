const meteoblueScraper = require('./meteoblue-scraper');

// Pass null to usage outside of node red
meteoblueScraper(null, {
    requestUrl: 'https://www.meteoblue.com/en/weather/forecast/week/aarau_switzerland_2661881',
    cookies: 'addparam=true'
});