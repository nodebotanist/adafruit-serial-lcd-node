'use strict'

const SerialPort = require('serialport')

function AdafruitSerialLCD(opts) {
  this.baud = opts.baud
  this.serialport = new SerialPort(opts.port, {
    baudRate: this.baud
  })
}

AdafruitSerialLCD.prototype.print = function(output){
  this.serialport.write(output)
}

module.exports = AdafruitSerialLCD