/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 6/24/16.
 */

module.exports = {
  climate: {
    si7020: require('./lib/climate-si7020.js')
  },
  rfid: {
    pn532: require('./lib/rfid-pn532.js')
  }
};