'use strict'

const SerialPort = require('serialport')

// Lib constants
const BAUD_RATES = {
  1200: 0x53,
  2400: 0x29,
  4800: 0xCF,
  9600: 0x67,
  19200: 0x33,
  28800: 0x22,
  38400: 0x19,
  57600: 0x10,
  115200: 0x08
}

function AdafruitSerialLCD(opts) {
  if(!BAUD_RATES[opts.baud]){
    throw new Error('Invalid baud rate for serial LCD. Valid values between 1200-115200 accepted')
  }
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