/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 6/24/16.
 */

var tessel = require('tessel');
var rfidlib = require('rfid-pn532');

function emit(port, timeout, cb) {
  var rfid = rfidlib.use(tessel.port[port]);

  rfid.on('ready', function() {
    var latestUID;

    rfid.on('data', function(card) {
      latestUID = card.uid.toString('hex');
    });

    setInterval(function(){
      if (latestUID) {
        cb({
          module: 'rfid-pn532',
          device: tessel.deviceId(),
          uid: latestUID
        });
      }
    }, timeout);
  });
}

module.exports = emit;
