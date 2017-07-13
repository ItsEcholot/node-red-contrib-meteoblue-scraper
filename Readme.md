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
        - precipitationMmPer3h:object - Amount of precipitation in millimeters per 3 hours
            - min:number - Minimum amount of precipitation in millimeters per 3 hours
            - max:number - Maximum amount of precipitation in millimeters per 3 hours
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
    "2017-07-13T01:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_night.svg",
      "temperatureC": 17,
      "windDirection": "NNW",
      "windSpeedKmh": 2,
      "windGustKmh": 6,
      "temperatureFeltC": 19,
      "relativeHumidity": 97,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 10
    },
    "2017-07-13T02:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/22_night.svg",
      "temperatureC": 17,
      "windDirection": "N",
      "windSpeedKmh": 2,
      "windGustKmh": 9,
      "temperatureFeltC": 19,
      "relativeHumidity": 97,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 10
    },
    "2017-07-13T03:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/22_night.svg",
      "temperatureC": 17,
      "windDirection": "NNE",
      "windSpeedKmh": 1,
      "windGustKmh": 13,
      "temperatureFeltC": 19,
      "relativeHumidity": 97,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 10
    },
    "2017-07-13T04:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 17,
      "windDirection": "NNE",
      "windSpeedKmh": 3,
      "windGustKmh": 13,
      "temperatureFeltC": 18,
      "relativeHumidity": 94,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 30
    },
    "2017-07-13T05:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 17,
      "windDirection": "NE",
      "windSpeedKmh": 5,
      "windGustKmh": 18,
      "temperatureFeltC": 18,
      "relativeHumidity": 94,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 30
    },
    "2017-07-13T06:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 18,
      "windDirection": "ENE",
      "windSpeedKmh": 7,
      "windGustKmh": 20,
      "temperatureFeltC": 18,
      "relativeHumidity": 94,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 30
    },
    "2017-07-13T07:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/22_day.svg",
      "temperatureC": 19,
      "windDirection": "ENE",
      "windSpeedKmh": 8,
      "windGustKmh": 18,
      "temperatureFeltC": 22,
      "relativeHumidity": 80,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 10
    },
    "2017-07-13T08:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/22_day.svg",
      "temperatureC": 20,
      "windDirection": "ENE",
      "windSpeedKmh": 9,
      "windGustKmh": 18,
      "temperatureFeltC": 22,
      "relativeHumidity": 80,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 10
    },
    "2017-07-13T09:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 21,
      "windDirection": "ENE",
      "windSpeedKmh": 9,
      "windGustKmh": 20,
      "temperatureFeltC": 22,
      "relativeHumidity": 80,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 10
    },
    "2017-07-13T10:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_day.svg",
      "temperatureC": 22,
      "windDirection": "ENE",
      "windSpeedKmh": 9,
      "windGustKmh": 16,
      "temperatureFeltC": 25,
      "relativeHumidity": 68,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T11:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_day.svg",
      "temperatureC": 23,
      "windDirection": "ENE",
      "windSpeedKmh": 9,
      "windGustKmh": 17,
      "temperatureFeltC": 25,
      "relativeHumidity": 68,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T12:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_day.svg",
      "temperatureC": 23,
      "windDirection": "ENE",
      "windSpeedKmh": 8,
      "windGustKmh": 14,
      "temperatureFeltC": 25,
      "relativeHumidity": 68,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T13:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_day.svg",
      "temperatureC": 23,
      "windDirection": "ENE",
      "windSpeedKmh": 7,
      "windGustKmh": 11,
      "temperatureFeltC": 25,
      "relativeHumidity": 63,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T14:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_day.svg",
      "temperatureC": 24,
      "windDirection": "ENE",
      "windSpeedKmh": 6,
      "windGustKmh": 9,
      "temperatureFeltC": 25,
      "relativeHumidity": 63,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T15:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_day.svg",
      "temperatureC": 24,
      "windDirection": "ENE",
      "windSpeedKmh": 5,
      "windGustKmh": 9,
      "temperatureFeltC": 25,
      "relativeHumidity": 63,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T16:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_day.svg",
      "temperatureC": 24,
      "windDirection": "ENE",
      "windSpeedKmh": 5,
      "windGustKmh": 10,
      "temperatureFeltC": 23,
      "relativeHumidity": 67,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T17:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/07_day.svg",
      "temperatureC": 23,
      "windDirection": "ENE",
      "windSpeedKmh": 4,
      "windGustKmh": 10,
      "temperatureFeltC": 23,
      "relativeHumidity": 67,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T18:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/13_day.svg",
      "temperatureC": 22,
      "windDirection": "NE",
      "windSpeedKmh": 3,
      "windGustKmh": 9,
      "temperatureFeltC": 23,
      "relativeHumidity": 67,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T19:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/01_day.svg",
      "temperatureC": 20,
      "windDirection": "NNE",
      "windSpeedKmh": 2,
      "windGustKmh": 6,
      "temperatureFeltC": 17,
      "relativeHumidity": 73,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T20:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_night.svg",
      "temperatureC": 18,
      "windDirection": "NNE",
      "windSpeedKmh": 1,
      "windGustKmh": 6,
      "temperatureFeltC": 17,
      "relativeHumidity": 73,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    },
    "2017-07-13T21:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/22_night.svg",
      "temperatureC": 17,
      "windDirection": "ENE",
      "windSpeedKmh": 1,
      "windGustKmh": 4,
      "temperatureFeltC": 17,
      "relativeHumidity": 73,
      "precipitationMmPer3h": {
        "min": 0,
        "max": 0
      },
      "precipitationProbabilityPercentage": 0
    }
  },
  "uvIndex": 8,
  "timesSunriseSunset": {
    "sunrise": "2017-07-13T03:48",
    "sunset": "2017-07-13T19:18"
  },
  "moonInfo": "Abnehmender Mond (229\u00b0)",
  "pressureHpa": 1019,
  "timezone": "UTC",
  "domain": "NEMS4",
  "lastModelRun": 1499930700,
  "weatherDescription": "In der Nacht bis zum sp\u00e4ten Morgen bleibt es bedeckt. Die Wolken lockern am Nachmittag auf. Die Sonne ist nur vereinzelt sichtbar. Die Sonneneinstrahlung ist erh\u00f6ht mit einem UV-Index von 8. Auf Sonnenschutz sollte geachtet werden.\r\nAm Donnerstag weht ein leichter Wind. Die Windgeschwindigkeit erreicht bis zu 9km\/h. Der Wind kommt nachts aus Norden, morgens aus Nord-Ost und nachmittags aus Osten.\r\nDie Wettervorhersage in Aarau f\u00fcr Donnerstag ist stabil und sollte zutreffen.",
  "meteogram": "\/\/my.meteoblue.com\/visimage\/meteogram_web_hd?look=KILOMETER_PER_HOUR%2CCELSIUS%2CMILLIMETER&apikey=5838a18e295d&cache=no&city=Aarau&iso2=ch&lat=47.392502&lon=8.044220&asl=389&tz=Europe%2FZurich&lang=de&ts=1499951962&sig=d9c9b9de033b1e233fcb81b36dd13c80 1.4x"
}
```

Debugging
-----------------------
Run index.js with node to start the scraping and parsing process in your debugger.

Built with / Dependencies
-------------------------
- [Osmosis](https://github.com/rchipka/node-osmosis) - The web scraper used