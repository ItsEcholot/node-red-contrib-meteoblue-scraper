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
                'time': ['.times>td>.cell'],
                'icon': ['.icons>td>.cell>.pictoicon>.picon@class'],
                'temperatureC': ['.temperatures>td>.cell'],
                'temperatureFeltC': ['.windchills>td>.cell'],
                'windDirection': ['.winddirs>td>.cell>div'],
                'windSpeedKmh': ['.windspeeds>td>.cell'],
                'relativeHumidity': ['.humidities>td>.cell'],
                'precipationMmPer3h': ['.precips:first>td>.cell'],
                'precipationProbabilityPercentage': ['.precipprobs>td>.cell'],
                'precipationHourly': ['.precip-hourly-title>.precip-bar-part>.precip-hourly>.precip-help>strong'],
                'uvIndex': '.model-info>.sun>.uv-index>.uv-value',
                'timesSunriseSunset': '.model-info>.sun>.times-rs',
                'moonInfo': '.model-info>.moon>.moon-icon@title',
                'pressureHpa': '.model-info>.misc>span:first',
                'timezone': '.model-info>.misc>span:skip(1)',
                'domain': '.model-info>.misc>span:skip(2)',
                'lastModelRun': '.model-info>.misc>span:skip(3)',
                'weatherDescription': ['#tab_wrapper>.tab_detail>div>div:skip(3)>p']
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

        // Create a weather information object for each 3 hours
        data.time.forEach(function (timeEl, timeIndex) {
            timeEl = parseInt(timeEl) - 300;
            parsedData[timeEl] = {};

            // Add all the available properties to the weather information object that are arrays and contain enough data
            for(let scrapeIndex in data) {
                if(data.hasOwnProperty(scrapeIndex)) {
                    if(data[scrapeIndex].constructor === Array && data[scrapeIndex].length === data.time.length) {
                        switch(scrapeIndex) {
                            case 'time':
                                parsedData[timeEl][scrapeIndex] = timeEl;
                                break;
                            case 'icon':
                                parsedData[timeEl][scrapeIndex] = 'https://static.meteoblue.com/website/images/picto/' + data[scrapeIndex][timeIndex].replace(/picon p/, '') + '.svg';
                                break;
                            case 'windSpeedKmh':
                            case 'precipationMmPer3h':
                                parsedData[timeEl][scrapeIndex] = {
                                    min: parseInt(data[scrapeIndex][timeIndex].split('-')[0]),
                                    max: parseInt(data[scrapeIndex][timeIndex].split('-')[1])
                                };
                                break;
                            case 'temperatureC':
                            case 'temperatureFeltC':
                            case 'relativeHumidity':
                            case 'precipationProbabilityPercentage':
                                parsedData[timeEl][scrapeIndex] = parseInt(data[scrapeIndex][timeIndex]);
                                break;
                            default:
                                parsedData[timeEl][scrapeIndex] = data[scrapeIndex][timeIndex];
                        }
                    }

                    else if(data[scrapeIndex].constructor === Array && data[scrapeIndex].length === data.time.length * 2 * 3) {
                        // Split the available hourly data into 2*3hours
                        let precipationHourlyTimeGroup = data[scrapeIndex].splice(0,6);
                        let precipationHourlyTimeObject = {};
                        // For each hour create two properties and pop the value from the split array
                        for(let i = 0; i<3; i++) {
                            precipationHourlyTimeObject[timeEl+(100*i)] = {
                                precipationProbabilityPercentage: parseInt(precipationHourlyTimeGroup.shift()),
                                precipationMmPer3h: parseInt(precipationHourlyTimeGroup.shift())
                            }
                        }
                        parsedData[timeEl][scrapeIndex] = precipationHourlyTimeObject;
                    }
                }
            }
        });

        // Add all the time insensitive properties to the parsedData object
        for(let scrapeIndex in data) {
            if(data.hasOwnProperty(scrapeIndex) && (data[scrapeIndex].constructor !== Array || (data[scrapeIndex].length !== data.time.length * 2 * 3 && data[scrapeIndex].length !== data.time.length))) {
                switch(scrapeIndex) {
                    case 'pressureHpa':
                    case 'uvIndex':
                        parsedData[scrapeIndex] = parseInt(data[scrapeIndex].match(/\d+/));
                        break;
                    case 'domain':
                    case 'timezone':
                        parsedData[scrapeIndex] = data[scrapeIndex].split(': ')[1];
                        break;
                    case 'timesSunriseSunset':
                        parsedData[scrapeIndex] = {
                            sunrise: parseInt(data[scrapeIndex].split(/\n/)[0]),
                            sunset: parseInt(data[scrapeIndex].split(/\n/)[1])
                        };
                        break;
                    case 'lastModelRun':
                        parsedData[scrapeIndex] = new Date(data[scrapeIndex].match(/[\d.]{10} \d{2}\:\d{2}/)).getTime()/1000;
                        break;
                    case 'weatherDescription':
                        parsedData[scrapeIndex] = data[scrapeIndex].join("\r\n");
                        break;
                    default:
                        parsedData[scrapeIndex] = data[scrapeIndex];
                }
            }
        }

        return callback(parsedData);
    }

    if(RED)
        RED.nodes.registerType('meteoblue-scraper', MeteoBlueScraperNode);
};