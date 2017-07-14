Node-RED Meteoblue Scraper
==========================

[![NPM](https://nodei.co/npm/node-red-contrib-meteoblue-scraper.png)](https://npmjs.org/package/node-red-contrib-meteoblue-scraper)

This Node-RED node will, on any input, scrape the 7-day forecast and the meteogram page
at the url defined in the node configuration.

It parses the found data and creates a payload object with the matching properties.

Getting Started
---------------
Navigate to the node-red installation directory and add the package via NPM.
```
cd $HOME/.node-red
npm install node-red-contrib-meteoblue-scraper
```
Restart node-red and reload your node-red browser window for changes to take effect.
Remember to configure the meteoblue-scraper node before you deploy your changes.

Documentation
-------------
### Input  
The meteoblue-scraper node will accept any input for starting the scraping and 
parsing process.  
At the moment it's not configurable through the input payload.

### Output  
The meteoblue-scraper node will output a payload object with the following properties:

- weatherData:object - Contains multiple {{date string}} objects that contain the
weather data
    - {{date string}}:object - Contains the actual weather data
        - icon:string - Direct link to a SVG file that is used as an icon on the
        meteoblue website.
        - temperatureC:number - Temperature in degree Celsius
        - temperatureFeltC:number - Temperature "felt" in degree Celsius
        - windDirection:string - Wind direction abbreviation
        - windSpeedKmh:number - Wind speed in kilometers per hour
        - windGustKmh:number - Wind gust speed in kilometers per hour
        - relativeHumidity:number - Relative humidity in percentage
        - precipitationAmountMm:number - Amount of precipitation in this hour
        - precipitationProbabilityPercentage:number - Probability of precipitation in
        percentage
- uvIndex:number - UV Index
- timesSunriseSunset:object - Contains sunrise and sunset dates
    - sunrise:string - Date string of the sunrise
    - sunset:string - Date string of the sunset
- moonInfo:string - String with moon phase and angle
- pressureHpa:number - Pressure in hectopascals
- timezone:string - Timezone of all time values. Currently always UTC
- domain:string - Not known. Identifier of some sort.
- lastModelRun:number - Timestamp of last time model was run by meteoblue
- weatherDescription:string - Description of weather written by meteoblue if available
- meteogram:string - URL for the meteogram. The link is only valid for 15 minutes.

Sample output
-------------
```
{
  "weatherData": {
    "2017-07-13T22:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_night.svg",
      "temperatureC": 17,
      "windDirection": "NNE",
      "windSpeedKmh": 2,
      "windGustKmh": 7,
      "precipitationProbabilityPercentage": 10,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 18,
      "relativeHumidity": 86
    },
    "2017-07-13T23:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_night.svg",
      "temperatureC": 17,
      "windDirection": "N",
      "windSpeedKmh": 3,
      "windGustKmh": 8,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 17,
      "relativeHumidity": 82.5
    },
    "2017-07-14T00:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/08_night.svg",
      "temperatureC": 17,
      "windDirection": "NNW",
      "windSpeedKmh": 2,
      "windGustKmh": 4,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 16,
      "relativeHumidity": 79
    },
    "2017-07-14T01:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/22_night.svg",
      "temperatureC": 17,
      "windDirection": "NW",
      "windSpeedKmh": 2,
      "windGustKmh": 4,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 10,
      "temperatureFeltC": 16,
      "relativeHumidity": 79
    },
    "2017-07-14T02:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_night.svg",
      "temperatureC": 16,
      "windDirection": "WNW",
      "windSpeedKmh": 1,
      "windGustKmh": 5,
      "precipitationProbabilityPercentage": 10,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 17,
      "relativeHumidity": 80.5
    },
    "2017-07-14T03:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/33_night.svg",
      "temperatureC": 16,
      "windDirection": "WSW",
      "windSpeedKmh": 2,
      "windGustKmh": 11,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 10,
      "temperatureFeltC": 18,
      "relativeHumidity": 82
    },
    "2017-07-14T04:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 16,
      "windDirection": "WSW",
      "windSpeedKmh": 2,
      "windGustKmh": 12,
      "precipitationProbabilityPercentage": 10,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 18,
      "relativeHumidity": 82
    },
    "2017-07-14T05:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/33_day.svg",
      "temperatureC": 17,
      "windDirection": "W",
      "windSpeedKmh": 2,
      "windGustKmh": 16,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 20,
      "temperatureFeltC": 19.5,
      "relativeHumidity": 82
    },
    "2017-07-14T06:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/22_day.svg",
      "temperatureC": 18,
      "windDirection": "W",
      "windSpeedKmh": 4,
      "windGustKmh": 17,
      "precipitationProbabilityPercentage": 20,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 21,
      "relativeHumidity": 82
    },
    "2017-07-14T07:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 19,
      "windDirection": "W",
      "windSpeedKmh": 8,
      "windGustKmh": 23,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 30,
      "temperatureFeltC": 21,
      "relativeHumidity": 82
    },
    "2017-07-14T08:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 20,
      "windDirection": "W",
      "windSpeedKmh": 8,
      "windGustKmh": 24,
      "precipitationProbabilityPercentage": 30,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 22,
      "relativeHumidity": 76
    },
    "2017-07-14T09:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 20,
      "windDirection": "W",
      "windSpeedKmh": 8,
      "windGustKmh": 25,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 40,
      "temperatureFeltC": 23,
      "relativeHumidity": 70
    },
    "2017-07-14T10:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_day.svg",
      "temperatureC": 21,
      "windDirection": "W",
      "windSpeedKmh": 9,
      "windGustKmh": 27,
      "precipitationProbabilityPercentage": 40,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 23,
      "relativeHumidity": 70
    },
    "2017-07-14T11:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/33_day.svg",
      "temperatureC": 22,
      "windDirection": "W",
      "windSpeedKmh": 10,
      "windGustKmh": 29,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 40,
      "temperatureFeltC": 22.5,
      "relativeHumidity": 67.5
    },
    "2017-07-14T12:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_day.svg",
      "temperatureC": 22,
      "windDirection": "W",
      "windSpeedKmh": 11,
      "windGustKmh": 29,
      "precipitationProbabilityPercentage": 40,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 22,
      "relativeHumidity": 65
    },
    "2017-07-14T13:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_day.svg",
      "temperatureC": 22,
      "windDirection": "WNW",
      "windSpeedKmh": 11,
      "windGustKmh": 31,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 40,
      "temperatureFeltC": 22,
      "relativeHumidity": 65
    },
    "2017-07-14T14:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/33_day.svg",
      "temperatureC": 23,
      "windDirection": "WNW",
      "windSpeedKmh": 13,
      "windGustKmh": 32,
      "precipitationProbabilityPercentage": 40,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 21.5,
      "relativeHumidity": 65
    },
    "2017-07-14T15:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_day.svg",
      "temperatureC": 23,
      "windDirection": "WNW",
      "windSpeedKmh": 11,
      "windGustKmh": 28,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 40,
      "temperatureFeltC": 21,
      "relativeHumidity": 65
    },
    "2017-07-14T16:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_day.svg",
      "temperatureC": 23,
      "windDirection": "WNW",
      "windSpeedKmh": 10,
      "windGustKmh": 29,
      "precipitationProbabilityPercentage": 40,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 21,
      "relativeHumidity": 65
    },
    "2017-07-14T17:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_day.svg",
      "temperatureC": 22,
      "windDirection": "WNW",
      "windSpeedKmh": 9,
      "windGustKmh": 26,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 60,
      "temperatureFeltC": 18.5,
      "relativeHumidity": 71
    },
    "2017-07-14T18:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_day.svg",
      "temperatureC": 21,
      "windDirection": "WNW",
      "windSpeedKmh": 7,
      "windGustKmh": 21,
      "precipitationProbabilityPercentage": 60,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 16,
      "relativeHumidity": 77
    },
    "2017-07-14T19:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/01_day.svg",
      "temperatureC": 19,
      "windDirection": "NW",
      "windSpeedKmh": 4,
      "windGustKmh": 14,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 60,
      "temperatureFeltC": 16,
      "relativeHumidity": 77
    },
    "2017-07-14T20:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_night.svg",
      "temperatureC": 17,
      "windDirection": "WNW",
      "windSpeedKmh": 3,
      "windGustKmh": 15,
      "precipitationProbabilityPercentage": 60,
      "precipitationAmountMm": 0,
      "temperatureFeltC": 17,
      "relativeHumidity": 81.5
    },
    "2017-07-14T21:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_night.svg",
      "temperatureC": 16,
      "windDirection": "WSW",
      "windSpeedKmh": 3,
      "windGustKmh": 14,
      "precipitationProbabilityPercentage": 0,
      "precipitationAmountMm": 60,
      "temperatureFeltC": 18,
      "relativeHumidity": 86
    }
  },
  "uvIndex": 8,
  "timesSunriseSunset": {
    "sunrise": "2017-07-14T03:49",
    "sunset": "2017-07-14T19:18"
  },
  "moonInfo": "Abnehmender Mond (241\u00b0)",
  "pressureHpa": 1018,
  "timezone": "UTC",
  "domain": "NEMS4",
  "lastModelRun": 1499974140,
  "weatherDescription": "In der Nacht und am Nachmittag ist das Wetter wechselhaft klar mit gelegentlichen Schauern. Am Morgen wird es dicht bew\u00f6lkt und regnerisch. Die Sonne ist nur vereinzelt sichtbar. Der UV-Index betr\u00e4gt 8. Es sollte auf Sonnenschutz geachtet werden.\r\nIn der Nacht und am Morgen weht ein leichter Wind. Freitagnachmittag weht eine m\u00e4\u00dfige Brise. Die Windgeschwindigkeit erreicht bis zu 13km\/h. Der Wind kommt nachts aus Nord-Ost, morgens aus Westen und nachmittags aus Nord-West.\r\nDie Wettervorhersage in Aarau f\u00fcr Freitag ist stabil und sollte zutreffen.",
  "meteogram": "\/\/my.meteoblue.com\/visimage\/meteogram_web_hd?look=KILOMETER_PER_HOUR%2CCELSIUS%2CMILLIMETER&apikey=5838a18e295d&cache=no&city=Aarau&iso2=ch&lat=47.392502&lon=8.044220&asl=389&tz=Europe%2FZurich&lang=de&ts=1500016140&sig=8b0083fdefeac6787a33222562491c71"
}
```

Debugging
-----------------------
Run index.js with node to start the scraping and parsing process in your debugger.

Built with / Dependencies
-------------------------
- [Osmosis](https://github.com/rchipka/node-osmosis) - The web scraper used