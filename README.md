# tz-geo

[![npm version](https://badge.fury.io/js/tz-geo.svg)](http://badge.fury.io/js/tz-geo) [![Build Status](https://travis-ci.org/codeforeurope/tz-geo.svg?branch=master)](https://travis-ci.org/codeforeurope/tz-geo) [![Dependency Status](https://david-dm.org/codeforeurope/tz-geo.svg)](https://david-dm.org/codeforeurope/tz-geo) [![Test Coverage](https://codeclimate.com/github/codeforeurope/tz-geo/badges/coverage.svg)](https://codeclimate.com/github/codeforeurope/tz-geo/coverage)

Compatible with [node-geo-tz](https://github.com/evansiroky/node-geo-tz)

## Install

`npm install tz-geo`

## Usage

    var geoTz = require('tz-geo')
    var name         = geoTz.tz(47.650499, -122.350070)                                // 'America/Los_Angeles'
    var now          = geoTz.tzMoment(47.650499, -122.350070)                          // moment-timezone obj
    var specificTime = geoTz.tzMoment(47.650499, -122.350070, '2016-03-30T01:23:45Z')  // moment-timezone obj

## API Docs:

### .tz(lat, lon)

Returns timezone name found at `lat`, `lon`.  Returns null if timezone could not be found at coordinate.

### .tzMoment(lat, lon, [dateTime])

Returns a moment-timezone object found at `lat`, `lon`.  Returns null if timezone could not be found at coordinate.  If `dateTime` is omitted, the moment-timezone will have the current time set.  If `dateTime` is provided, moment-timezone will be set to the time provided according to the timezone found.  `dateTime` can be any single-argument parameter that will get passed to the [`moment()` parser](http://momentjs.com/docs/#/parsing/).