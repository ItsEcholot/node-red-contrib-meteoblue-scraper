Node-RED Meteoblue Scraper
==========================

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
        - windSpeedKmh:object - Contains wind speed in kilometers per hour data
            - min:number - Minimum wind speed in kilometers per hour
            - max:number - Maximum wind speed in kilometers per hour
        - relativeHumidity:number - Relative humidity in percentage
        - precipitationMmPer3h:object - Amount of precipitation in millimeters per 3 hours
            - min:number - Minimum amount of precipitation in millimeters per 3 hours
            - max:number - Maximum amount of precipitation in millimeters per 3 hours
        - precipitationProbabilityPercentage:number - Probability of precipitation in
        percentage
        - precipitationHourly:object - Contains multiple {{date string}} objects that contain
        hourly precipitation values
            - {{date string}}:object - Contains the actual hourly precipitation data
                - precipitationProbabilityPercentage:number - Probability of precipitation
                in percentage.
                - precipitationMmPer3h:number - Amount of precipitation in millimeters
                per 3 hours.
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
- meteogram:string - URL for the meteogram. Currently the scraped URL doesn't seem to work.

Sample output
-------------
```
{
  "weatherData": {
    "2017-07-13T03:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/22_night.svg",
      "temperatureC": 17,
      "temperatureFeltC": 19,
      "windDirection": "NNO",
      "windSpeedKmh": {
        "min": 1,
        "max": 13
      },
      "relativeHumidity": 97,
      "precipitationMmPer3h": {
        "min": null,
        "max": null
      },
      "precipitationProbabilityPercentage": 10,
      "precipitationHourly": {
        "2017-07-13T03:00": {
          "precipitationProbabilityPercentage": 10,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T04:00": {
          "precipitationProbabilityPercentage": 10,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T05:00": {
          "precipitationProbabilityPercentage": 10,
          "precipitationMmPer3h": 0
        }
      }
    },
    "2017-07-13T06:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 18,
      "temperatureFeltC": 18,
      "windDirection": "ONO",
      "windSpeedKmh": {
        "min": 7,
        "max": 20
      },
      "relativeHumidity": 94,
      "precipitationMmPer3h": {
        "min": null,
        "max": null
      },
      "precipitationProbabilityPercentage": 30,
      "precipitationHourly": {
        "2017-07-13T06:00": {
          "precipitationProbabilityPercentage": 10,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T07:00": {
          "precipitationProbabilityPercentage": 10,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T08:00": {
          "precipitationProbabilityPercentage": 30,
          "precipitationMmPer3h": 0
        }
      }
    },
    "2017-07-13T09:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/19_day.svg",
      "temperatureC": 21,
      "temperatureFeltC": 22,
      "windDirection": "ONO",
      "windSpeedKmh": {
        "min": 9,
        "max": 20
      },
      "relativeHumidity": 80,
      "precipitationMmPer3h": {
        "min": null,
        "max": null
      },
      "precipitationProbabilityPercentage": 10,
      "precipitationHourly": {
        "2017-07-13T09:00": {
          "precipitationProbabilityPercentage": 30,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T10:00": {
          "precipitationProbabilityPercentage": 30,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T11:00": {
          "precipitationProbabilityPercentage": 10,
          "precipitationMmPer3h": 0
        }
      }
    },
    "2017-07-13T12:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_day.svg",
      "temperatureC": 23,
      "temperatureFeltC": 26,
      "windDirection": "ONO",
      "windSpeedKmh": {
        "min": 8,
        "max": 14
      },
      "relativeHumidity": 68,
      "precipitationMmPer3h": {
        "min": null,
        "max": null
      },
      "precipitationProbabilityPercentage": 0,
      "precipitationHourly": {
        "2017-07-13T12:00": {
          "precipitationProbabilityPercentage": 10,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T13:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T14:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        }
      }
    },
    "2017-07-13T15:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/04_day.svg",
      "temperatureC": 24,
      "temperatureFeltC": 25,
      "windDirection": "ONO",
      "windSpeedKmh": {
        "min": 5,
        "max": 9
      },
      "relativeHumidity": 63,
      "precipitationMmPer3h": {
        "min": null,
        "max": null
      },
      "precipitationProbabilityPercentage": 0,
      "precipitationHourly": {
        "2017-07-13T15:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T16:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T17:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        }
      }
    },
    "2017-07-13T18:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/13_day.svg",
      "temperatureC": 22,
      "temperatureFeltC": 23,
      "windDirection": "NO",
      "windSpeedKmh": {
        "min": 3,
        "max": 9
      },
      "relativeHumidity": 67,
      "precipitationMmPer3h": {
        "min": null,
        "max": null
      },
      "precipitationProbabilityPercentage": 0,
      "precipitationHourly": {
        "2017-07-13T18:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T19:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T20:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        }
      }
    },
    "2017-07-13T21:00": {
      "icon": "https:\/\/static.meteoblue.com\/website\/images\/picto\/22_night.svg",
      "temperatureC": 17,
      "temperatureFeltC": 17,
      "windDirection": "ONO",
      "windSpeedKmh": {
        "min": 1,
        "max": 4
      },
      "relativeHumidity": 73,
      "precipitationMmPer3h": {
        "min": null,
        "max": null
      },
      "precipitationProbabilityPercentage": 0,
      "precipitationHourly": {
        "2017-07-13T21:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T22:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        },
        "2017-07-13T23:00": {
          "precipitationProbabilityPercentage": 0,
          "precipitationMmPer3h": 0
        }
      }
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
  "weatherDescription": "In der Nacht und am Morgen bleibt es bedeckt. Die Wolken lockern nachmittags auf. Die Sonne kommt zeitweise durch. Es wird ein UV-Index von 8 erreicht. Sonnenschutz ist empfohlen.\r\nIn der Nacht und w\u00e4hrend des Tages weht ein leichter Wind. Es werden Windgeschwindigkeiten bis zu 9km\/h erreicht. Der Wind kommt nachts aus Norden, morgens aus Nord-Ost und nachmittags aus Osten.\r\nDie Wettervorhersage in Aarau f\u00fcr Donnerstag ist stabil und sollte zutreffen.",
  "meteogram": "\/\/my.meteoblue.com\/visimage\/meteogram_web_hd?look=KILOMETER_PER_HOUR%2CCELSIUS%2CMILLIMETER&apikey=5838a18e295d&cache=no&city=Aarau&iso2=ch&lat=47.392502&lon=8.044220&asl=389&tz=Europe%2FZurich&lang=de&ts=1499942526&sig=79ab89aa9a55776762770bdeef6653c1 1.4x"
}
```

Debugging
-----------------------
Run index.js with node to start the scraping and parsing process in your debugger.

Built with / Dependencies
-------------------------
- [Osmosis](https://github.com/rchipka/node-osmosis) - The web scraper used