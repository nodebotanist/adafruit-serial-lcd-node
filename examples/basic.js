'use strict'

const AdafruitSerialLCD = require('../seriallcd.js')

let serialLCD = new AdafruitSerialLCD({
  port: '/dev/tty.usbmodem14131',
  baud: 9600
})

serialLCD.on('ready', () => {
  serialLCD.setSize(20, 4)
  serialLCD.moveCursor(1, 1)
  serialLCD.print("ABCDEFGHIJABCDEFGHIJ")
  serialLCD.moveCursor(1, 2)
  serialLCD.print("********************")
  serialLCD.moveCursor(1, 3)
  serialLCD.print("ABCDEFGHIJABCDEFGHIJ")
  serialLCD.moveCursor(1, 4)
  serialLCD.print("********************")
  setTimeout(serialLCD.clear.bind(serialLCD), 10000)
})

serialLCD.start()
