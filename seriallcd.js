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

AdafruitSerialLCD.prototype.clear = function(){
  this.serialport.write([0xFE, 0x58])
}

module.exports = AdafruitSerialLCD