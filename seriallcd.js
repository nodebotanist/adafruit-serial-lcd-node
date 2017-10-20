'use strict'

const util = require('util')
const EventEmitter = require('events').EventEmitter
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

  if(!opts.port){
    throw new Error('Port is required in options object')
  }

  this.baud = opts.baud
  this.serialport = new SerialPort(opts.port, {
    autoOpen: false,
    baudRate: this.baud
  })
}

util.inherits(AdafruitSerialLCD, EventEmitter)

AdafruitSerialLCD.prototype.start = function(){
  this.serialport.open((err) => {
    if(err){
      this.emit('error', 'Error opening port: ' + err)
    } else {
      this.emit('ready')
    }
  })
}

AdafruitSerialLCD.prototype.print = function(output){
  this.serialport.write(output)
}

AdafruitSerialLCD.prototype.setBacklightColor = function(opts){
  this.serialport.write([0xFE, 0xD0, opts.red || 0x00, opts.green || 0x00, opts.blue || 0x00])
}

AdafruitSerialLCD.prototype.clear = function(){
  this.serialport.write([0xFE, 0x58])
}

AdafruitSerialLCD.prototype.setSize = function(columns, rows){
  // I don't know why I have to add 1 to row. It just doesn't work otherwise.
  this.serialport.write([0xFE, 0xD1, columns || 0x00, (rows + 1) || 0x00])
}

AdafruitSerialLCD.prototype.moveCursor = function(column, row){
  this.serialport.write([0xFE, 0x47, column || 0x00, row || 0x00])
}

AdafruitSerialLCD.prototype.cursorHome = function(){
  this.moveCursor(1,1)
}

AdafruitSerialLCD.prototype.cursorForward = function(){
  this.serialport.write([0xFE, 0x4D])
}

AdafruitSerialLCD.prototype.cursorBack = function(){
  this.serialport.write([0xFE, 0x4C])
}

AdafruitSerialLCD.prototype.cursorUnderline = function(){
  this.serialport.write([0xFE, 0x4A])
}

AdafruitSerialLCD.prototype.cursorBlock = function(){
  this.serialport.write([0xFE, 0x53])
}

AdafruitSerialLCD.prototype.cursorOff = function(){
  this.serialport.write([0xFE, 0x54, 0xFE, 0x4B])
}

module.exports = AdafruitSerialLCD