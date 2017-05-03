# tz-geo

[![npm version](https://badge.fury.io/js/tz-geo.svg)](http://badge.fury.io/js/tz-geo) [![Build Status](https://travis-ci.org/codeforeurope/tz-geo.svg?branch=master)](https://travis-ci.org/codeforeurope/tz-geo) [![Dependency Status](https://david-dm.org/codeforeurope/tz-geo.svg)](https://david-dm.org/codeforeurope/tz-geo) [![Test Coverage](https://codeclimate.com/github/codeforeurope/tz-geo/badges/coverage.svg)](https://codeclimate.com/github/codeforeurope/tz-geo/coverage)

* We thank [evansiroky](https://github.com/evansiroky), this library is compatible with his great work at [node-geo-tz](https://github.com/evansiroky/node-geo-tz)
* Made with Natural Earth. Data from [www.naturalearthdata.com](http://www.naturalearthdata.com/downloads/10m-cultural-vectors/timezones/).

## Install

`npm install tz-geo`

## Usage

```javascript
    var tzgeo = require('tz-geo')
    var name         = tzgeo.tz(47.650499, -122.350070)                                // 'America/Los_Angeles'
    var now          = tzgeo.tzMoment(47.650499, -122.350070)                          // moment-timezone obj
    var specificTime = tzgeo.tzMoment(47.650499, -122.350070, '2016-03-30T01:23:45Z')  // moment-timezone obj

    //Returns an error or timezone string via callback
    tzgeo.getTimezone({ type: 'Point', coordinates: [51.48513770164579, 5.232168700000033 ] }, function(err, result){
      if (err) throw err;
      console.log(result.name);
    });

    //Returns an error or moment-timezone via callback
    tzgeo.getMoment({ type: 'Point', coordinates: [51.48513770164579, 5.232168700000033 ] }, function(err, result){
      if (err) throw err;
      console.log(result.name);
    });
```

## API Docs:

### .tz(lat, lon)

Returns timezone name found at `lat`, `lon`.  Returns null if timezone could not be found at coordinate.

### .tzMoment(lat, lon, [dateTime])

Returns a moment-timezone object found at `lat`, `lon`.  Returns null if timezone could not be found at coordinate.  If `dateTime` is omitted, the moment-timezone will have the current time set.  If `dateTime` is provided, moment-timezone will be set to the time provided according to the timezone found.  `dateTime` can be any single-argument parameter that will get passed to the [`moment()` parser](http://momentjs.com/docs/#/parsing/).

### .getTimezone(point, callback)

Returns a timezone string found at `{type: 'point', coordinates: [lon, lat]}`.  Returns `err` if timezone could not be found or no `moment-timezone` could be constructed from the geojson. If no moment-timezone can be constructed, please let us know so we can add it to our datafile.

### .getMoment(point, callback)

Returns a moment-timezone object found at `{type: 'point', coordinates: [lon, lat]}`.  Returns `err` if timezone could not be found or no `moment-timezone` could be constructed from the geojson. If no moment-timezone can be constructed, please let us know so wee can add it to our datafile.