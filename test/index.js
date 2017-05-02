assert = require('assert');
var ts = require('../index.js');
describe('Testing timezone', function() {

  it('Timezone Europe/Mariehamn should be returned for (30,50)', function(done) {
    ts.getTimezone({ type: 'Point', coordinates: [30, 50] }, function(err, result){
      if (err) throw err;
      assert.equal(result.name, "Europe/Mariehamn");
      done();
    });
  });

  it('Timezone Europe/Paris should be returned for (5.232168700000033, 51.48513770164579)', function(done) {
    ts.getTimezone({ type: 'Point', coordinates: [5.232168700000033, 51.48513770164579] }, function(err, result){
      if (err) throw err;
      assert.equal(result.name, "Europe/Paris");
      done();
    });
  });

  it('Timezone Asia/Riyadh should be returned for (51.48513770164579, 5.232168700000033)', function(done) {
    ts.getTimezone({ type: 'Point', coordinates: [51.48513770164579, 5.232168700000033 ] }, function(err, result){
      if (err) throw err;
      assert.equal(result.name, "Asia/Riyadh");
      done();
    });
  });

  it('.tz function should return Europe/Paris for 51.48513770164579, 5.232168700000033', function(done) {
    assert.equal(ts.tz(51.48513770164579, 5.232168700000033), "Europe/Paris");
    done();
  });

  it('.tz function should return America/Los_Angeles for 47.650499, -122.350070', function(done) {
    assert.equal(ts.tz(47.650499, -122.350070), "America/Los_Angeles");
    done();
  });

  it('.tzMoment should return utcOffset -420 for 47.650499, -122.350070', function(done) {
    var result = ts.tzMoment(47.650499, -122.350070);
    assert.equal(result.utcOffset(), -420);
    done();
  });

  it('.tzMoment should return utcOffset -420 for 51.48513770164579, 5.232168700000033', function(done) {
    assert.equal(ts.tzMoment(51.48513770164579, 5.232168700000033, '2016-03-30T01:23:45Z').utcOffset(), 120);
    done();
  });
});