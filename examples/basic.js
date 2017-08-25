'use strict'

const AdafruitSerialLCD = require('../seriallcd.js')

let serialLCD = new AdafruitSerialLCD({
  port: '/dev/tty.usbmodem14131',
  baud: 9600
})

serialLCD.print("Hello, World!\n")

setTimeout(serialLCD.clear.bind(serialLCD), 1000)