/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 6/24/16.
 */

var tessel = require('tessel');
var rfidlib = require('rfid-pn532');

function emit(port, timeout, cb) {
  var rfid = rfidlib.use(tessel.port[port]);

  rfid.on('ready', function() {
    //var latestUID;
    var readyForNext =true;

    rfid.on('data', function(card) {

      if (readyForNext) {
        readyForNext = false;
        cb({
          module: 'rfid-pn532',
          device: tessel.deviceId(),
          uid: card.uid.toString('hex')
        });

        setTimeout(function(){
          readyForNext = true;
        }, timeout);
      }
    });
  });
}

module.exports = emit;