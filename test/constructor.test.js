const SerialLCD = require('../seriallcd')

const sinon = require('sinon')
const SerialPort = require('serialport')

let stub = sinon.createStubInstance(SerialPort);

test('reject invalid baud values', () => {
  expect(() => { new SerialLCD({ baud: 4, port: '/dev/tty.usbmodem***' }) }).toThrow('Invalid baud rate for serial LCD. Valid values between 1200-115200 accepted')
})

test('accept valid baud value', () => {
  expect(() => { new SerialLCD({ baud: 9600, port: '/dev/tty.usbmodem***' }) }).not.toThrow()
})

test('Error if no port given', () => {
  expect(() => { new SerialLCD({ baud: 115200 }) }).toThrow('Port is required in options object')
})

// SerialPort.restore()