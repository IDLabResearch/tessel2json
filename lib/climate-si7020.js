/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 6/24/16.
 */

var tessel = require('tessel');
var climatelib = require('climate-si7020');

function emit(port, timeout, temperatureEncoding, cb) {
  var climate = climatelib.use(tessel.port[port]);

  climate.on('ready', function() {
    setImmediate(function loop() {
      climate.readTemperature(temperatureEncoding, function (errTemp, temp) {
        climate.readHumidity(function (errHumid, humid) {
          cb({
            module: 'climate-si7020',
            device: tessel.deviceId(),
            temperature: {
              value: temp,
              error: errTemp
            },
            humidity: {
              value: humid,
              error: errHumid
            }
          });
          setTimeout(loop, timeout);
        });
      });
    });
  });
}

module.exports = emit;