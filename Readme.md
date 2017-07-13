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
#### Input  
The meteoblue-scraper node will accept any input for starting the scraping and 
parsing process.  
At the moment it's not configurable through the input payload.

#### Output  
The meteoblue-scraper node will output a payload object with the following properties:

**precipationHourly**  
*Type:* array[42]  
*Description:* 

Built with / Dependencies
----------
- [Osmosis](https://github.com/rchipka/node-osmosis) - The web scraper used