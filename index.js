var jsts = require('jsts');
var moment = require('moment-timezone');
var geojsonReader = new jsts.io.GeoJSONReader();

exports.getTimezone = function(point, callback){
  jstsPoint = geojsonReader.read(point);
  var result;
  var fs = require('fs');
  var path = require('path');
  var featurecollection;
  fs.readFile(path.resolve(__dirname, 
'assets/ne_10m_time_zones.geojson'), 'utf8', function (err, data) {
    if (err) callback(err, null);
    featurecollection = JSON.parse(data).features;
    var jstsPolygons = featurecollection.map(function(feature, index) {
      var geometry = feature.geometry;
      geometry.properties = feature.properties;
      jstsPolygon = geojsonReader.read(geometry);
      jstsPolygon.__index = index;
      return jstsPolygon;
    });
    // Find polygon containing point
    var result;
    jstsPolygons.filter(function(jstsPolygon){
    var within = jstsPoint.within(jstsPolygon);
      return within;
    }).forEach(function(poly) {
      // We expect a single result. We should not use an array
      var props = featurecollection[poly.__index].properties;
      result = {
        "tz": props.time_zone,
        "name": props.name,
        "tz_name": props.tz_name1st
      };
    });
    //Construct a timezone object from the result
    if(result){
      var zone = moment.tz.zone(result.tz_name);
      if(zone){
        callback(null, zone);
      } else {
        callback(new Error(result.tz_name + ' is not a valid Timezone'), 
null);  
      }
    } else {
      callback(new Error('Timezone could not be found'), null);
    }
  });
};

exports.tz = function(lat,lon){
  jstsPoint = geojsonReader.read({type: "Point", coordinates: [lon, lat]});
  var result;
  var fs = require('fs');
  var path = require('path');
  var featurecollection = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'assets/ne_10m_time_zones.geojson'), 'utf8')).features;
  var jstsPolygons = featurecollection.map(function(feature, index) {
    var geometry = feature.geometry;
    geometry.properties = feature.properties;
    jstsPolygon = geojsonReader.read(geometry);
    jstsPolygon.__index = index;
    return jstsPolygon;
  });
  
  // Find polygon containing point
  var result;
  jstsPolygons.filter(function(jstsPolygon){
    var within = jstsPoint.within(jstsPolygon);
      return within;
    }).forEach(function(poly) {
      // We expect a single result. We should not use an array
      var props = featurecollection[poly.__index].properties;
      result = {
        "tz": props.time_zone,
        "name": props.name,
        "tz_name": props.tz_name1st
      };
    });
    //Construct a timezone object from the result
    if(result){
      var zone = moment.tz.zone(result.tz_name);
      if(zone){
        return zone.name;
      } else {
        throw new Error(result.tz_name + ' is not a valid Timezone');
      }
    } else {
      throw new Error('Timezone could not be found');
    }
};

exports.tzMoment = function(lat,lon, datetime){
  jstsPoint = geojsonReader.read({type: "Point", coordinates: [lon, lat]});
  var result;
  var fs = require('fs');
  var path = require('path');
  var featurecollection = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'assets/ne_10m_time_zones.geojson'), 'utf8')).features;
  var jstsPolygons = featurecollection.map(function(feature, index) {
    var geometry = feature.geometry;
    geometry.properties = feature.properties;
    jstsPolygon = geojsonReader.read(geometry);
    jstsPolygon.__index = index;
    return jstsPolygon;
  });
  
  // Find polygon containing point
  var result;
  jstsPolygons.filter(function(jstsPolygon){
    var within = jstsPoint.within(jstsPolygon);
      return within;
    }).forEach(function(poly) {
      // We expect a single result. We should not use an array
      var props = featurecollection[poly.__index].properties;
      result = {
        "tz": props.time_zone,
        "name": props.name,
        "tz_name": props.tz_name1st
      };
    });
    //Construct a timezone object from the result
    if(result){
      var zone = moment.tz.zone(result.tz_name);
      if(zone){
        if (datetime) {
          return moment(datetime).tz(zone.name)
        } else {
          return moment().tz(zone.name);
        }
      } else {
        throw new Error(result.tz_name + ' is not a valid Timezone');
      }
    } else {
      throw new Error('Timezone could not be found');
    }
};