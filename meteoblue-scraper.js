const osmosis = require('osmosis');

module.exports = function (RED, debugSettings) {
    if(!RED && debugSettings)
        scrapeMeteoblue(debugSettings.requestUrl, debugSettings.requestUrlMeteogram, debugSettings.cookies, function (data) {
            console.dir(data);
        });

    function MeteoBlueScraperNode(config) {
        RED.nodes.createNode(this, config);
        let node = this;

        node.on('input', function (msg) {
            scrapeMeteoblue(config.requestUrl, config.requestUrlMeteogram, config.cookies, function (data) {
                msg.payload = data;
                node.send(msg);
            });
        });
    }

    function scrapeMeteoblue(url, urlMeteogram, cookies, callback) {
        osmosis
            .get(url)
            .config('headers', {'cookie': cookies ? cookies : ''})
            .set({
                //'time': ['.times>td>.cell'],
                'timeHourly': ['.hourlywind tr:first>td'],
                //'icon': ['.icons>td>.cell>.pictoicon>.picon@class'],
                'icon': ['.hourlywind tr:range(2,2)>td>.pictoicon>.picon@class'],
                //'temperatureC': ['.temperatures>td>.cell'],
                'temperatureC': ['.hourlywind tr:range(4,4)>td'],
                'temperatureFeltC': ['.windchills>td>.cell'],
                //'windDirection': ['.winddirs>td>.cell>div'],
                'windDirection': ['.hourlywind tr:range(5,5)>td>span@class'],
                //'windSpeedKmh': ['.windspeeds>td>.cell'],
                'windSpeedKmh': ['.hourlywind tr:range(6,6)>td'],
                'windGustKmh': ['.hourlywind tr:range(7,7)>td'],
                'relativeHumidity': ['.humidities>td>.cell'],
                //'precipitationMmPer3h': ['.precips:first>td>.cell'],
                //'precipitationProbabilityPercentage': ['.precipprobs>td>.cell'],
                'precipitationHourly': ['.precip-hourly-title>.precip-bar-part>.precip-hourly>.precip-help>strong'],
                'uvIndex': '.model-info>.sun>.uv-index>.uv-value',
                'timesSunriseSunset': '.model-info>.sun>.times-rs',
                'moonInfo': '.model-info>.moon>.moon-icon@title',
                'pressureHpa': '.model-info>.misc>span:first',
                'timezone': '.model-info>.misc>span:skip(1)',
                'domain': '.model-info>.misc>span:skip(2)',
                'lastModelRun': '.model-info>.misc>span:skip(3)',
                'weatherDescription': ['#tab_wrapper>.tab_detail>.details>.col-12:skip(1)>p']
            })
            .get(urlMeteogram)
            .set({
                'meteogram': '#blooimage>img@data-srcset'
            })
            .data(function (data) {
                parseMeteoblue(data, function (parsedData) {
                    return callback(parsedData);
                });
            })
            .error(console.log);
    }

    function parseMeteoblue(data, callback) {
        let parsedData = {};
        parsedData['weatherData'] = {};

        // Parse all the data that is available hourly.
        data.timeHourly.forEach(function (timeEl, timeIndex) {
            let timeDate = timeStringToDate(timeEl);
            timeEl = timeDate.toISOString().slice(0,10) + 'T' + timeDate.toISOString().slice(11,16);
            parsedData['weatherData'][timeEl] = {};

            for(let scrapeIndex in data) {
                if(!data.hasOwnProperty(scrapeIndex))
                    continue;

                if(data[scrapeIndex].constructor === Array && (data[scrapeIndex].length === data.timeHourly.length || (data[scrapeIndex].length === data.timeHourly.length * 2 && scrapeIndex === 'precipitationHourly'))) {
                    switch(scrapeIndex) {
                        case 'timeHourly':
                            break;
                        case 'icon':
                            parsedData['weatherData'][timeEl][scrapeIndex] = 'https://static.meteoblue.com/website/images/picto/' + data[scrapeIndex][timeIndex].replace(/picon p/, '') + '.svg';
                            break;
                        case 'windDirection':
                            parsedData['weatherData'][timeEl][scrapeIndex] = data[scrapeIndex][timeIndex].replace('glyph winddir ', '');
                            break;
                        case 'temperatureC':
                        case 'windSpeedKmh':
                        case 'windGustKmh':
                            parsedData['weatherData'][timeEl][scrapeIndex] = parseInt(data[scrapeIndex][timeIndex]);
                            break;
                        case 'precipitationHourly':
                            parsedData['weatherData'][timeEl]['precipitationProbabilityPercentage'] = parseInt(data[scrapeIndex][timeIndex]);
                            parsedData['weatherData'][timeEl]['precipitationAmountMm'] = parseInt(data[scrapeIndex][timeIndex+1]);
                            break;
                        default:
                            parsedData['weatherData'][timeEl][scrapeIndex] = data[scrapeIndex][timeIndex];
                    }
                }
            }
        });

        // Parse all the data that is available every 3 hours.
        // Add the same value to 3 objects so that every object posses the same properties.
        data.timeHourly.forEach(function (timeEl, timeIndex) {
            for(let scrapeIndex in data) {
                if(!data.hasOwnProperty(scrapeIndex))
                    continue;

                if(data[scrapeIndex].constructor === Array && data[scrapeIndex].length === data.timeHourly.length / 3) {
                    for(let i=0; i<data[scrapeIndex].length; i++) {
                        let indexCounter = i*3;
                        for(let x=0; x<3; x++) {
                            switch(scrapeIndex) {
                                case 'temperatureFeltC':
                                case 'relativeHumidity':
                                    parsedData['weatherData'][Object.keys(parsedData['weatherData'])[indexCounter+x]][scrapeIndex] = parseInt(data[scrapeIndex][i]) - (x * 0.33 * (parseInt(data[scrapeIndex][i]) - (parseInt(data[scrapeIndex][i+1]) ? parseInt(data[scrapeIndex][i+1]) : parseInt(data[scrapeIndex][0]))));
                                    break;
                                default:
                                    parsedData['weatherData'][Object.keys(parsedData['weatherData'])[indexCounter+x]][scrapeIndex] = data[scrapeIndex][i];
                            }
                        }
                    }
                }
            }
        });

        // Add all the time insensitive properties to the parsedData object
        for(let scrapeIndex in data) {
            if(data.hasOwnProperty(scrapeIndex) && (data[scrapeIndex].constructor !== Array || (data[scrapeIndex].length !== data.timeHourly.length / 3 && data[scrapeIndex].length !== data.timeHourly.length))) {
                switch(scrapeIndex) {
                    case 'pressureHpa':
                    case 'uvIndex':
                        parsedData[scrapeIndex] = parseInt(data[scrapeIndex].match(/\d+/));
                        break;
                    case 'domain':
                        parsedData[scrapeIndex] = data[scrapeIndex].split(': ')[1];
                        break;
                    case 'timezone':
                        // We're compensating for timezones. So let's set this to UTC.
                        parsedData[scrapeIndex] = 'UTC';
                        break;
                    case 'timesSunriseSunset':
                        let sunrise = new Date();
                        sunrise.setHours(parseInt((data[scrapeIndex].split(/\n/)[0]).split(':')[0]));
                        sunrise.setMinutes(parseInt((data[scrapeIndex].split(/\n/)[0]).split(':')[1]));
                        let sunset = new Date();
                        sunset.setHours(parseInt((data[scrapeIndex].split(/\n/)[1]).split(':')[0]));
                        sunset.setMinutes(parseInt((data[scrapeIndex].split(/\n/)[1]).split(':')[1]));
                        parsedData[scrapeIndex] = {
                            sunrise: sunrise.toISOString().slice(0,10) + 'T' + sunrise.toISOString().slice(11,16),
                            sunset: sunset.toISOString().slice(0,10) + 'T' + sunset.toISOString().slice(11,16)
                        };
                        break;
                    case 'lastModelRun':
                        if(data[scrapeIndex].match(/[\d.-]{10} \d{2}\:\d{2}/)[0]) {
                            let dateTime = data[scrapeIndex].match(/[\d.-]{10} \d{2}\:\d{2}/)[0].split(' ');
                            dateTime[0] = dateTime[0].split('.').reverse().join('-');
                            dateTime = dateTime.join(' ');
                            parsedData[scrapeIndex] = new Date(dateTime).getTime() / 1000;
                        }
                        break;
                    case 'weatherDescription':
                        parsedData[scrapeIndex] = data[scrapeIndex].join("\r\n");
                        break;
                    case 'precipitationHourly':
                        break;
                    case 'meteogram':
                        parsedData[scrapeIndex] = data[scrapeIndex].replace(' 1.4x', '');
                        break;
                    default:
                        parsedData[scrapeIndex] = data[scrapeIndex];
                }
            }
        }

        return callback(parsedData);
    }

    function timeStringToDate(timeString) {
        let time = new Date();
        time.setHours(timeString.substring(0,2));
        time.setMinutes(timeString.substring(2,4));
        time = new Date(time.getTime());

        return time;
    }

    if(RED)
        RED.nodes.registerType('meteoblue-scraper', MeteoBlueScraperNode);
};