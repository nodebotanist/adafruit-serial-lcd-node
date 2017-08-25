'use strict'

const AdafruitSerialLCD = require('../seriallcd.js')

let serialLCD = new AdafruitSerialLCD({
  port: '/dev/tty.usbmodem14131',
  baud: 9600
})

serialLCD.on('ready', () => {
  serialLCD.print("Hello, World!\n")
  setTimeout(serialLCD.clear.bind(serialLCD), 1000)
})

serialLCD.start()
