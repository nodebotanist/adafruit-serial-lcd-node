'use strict'

const AdafruitSerialLCD = require('../seriallcd.js')

let serialLCD = new AdafruitSerialLCD({
  port: '/dev/tty.usbmodem14131',
  baud: 9600
})

serialLCD.on('ready', () => {
  serialLCD.setSize([0x14, 0x05])
  serialLCD.moveCursor([0x01, 0x01])
  serialLCD.print("ABCDEFGHIJABCDEFGHIJ")
  serialLCD.moveCursor([0x01, 0x02])
  serialLCD.print("********************")
  serialLCD.moveCursor([0x01, 0x03])
  serialLCD.print("ABCDEFGHIJABCDEFGHIJ")
  serialLCD.moveCursor([0x01, 0x04])
  serialLCD.print("********************")
  setTimeout(serialLCD.clear.bind(serialLCD), 10000)
})

serialLCD.start()
