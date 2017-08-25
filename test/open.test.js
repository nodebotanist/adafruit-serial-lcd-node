const SerialLCD = require('../seriallcd')

let serialLCD, spy

beforeEach(() => {
  serialLCD = new SerialLCD({ baud: 9600, port: '/dev/tty.usbmodem***' })
})

test('start should fire ready event when serial port is open', ()=>{
  serialLCD.serialport.open = jest.fn().mockImplementation((cb) => { cb(null) })
  spy = jest.fn()
  serialLCD.on('ready', spy)
  serialLCD.start()
  expect(spy).toHaveBeenCalled()
})

test('start should pass on error from serialport', () => {
  serialLCD.serialport.open = jest.fn().mockImplementation((cb) => { cb('This Error is bad.') })
  expect(() => { serialLCD.start() }).toThrow('Error opening port: This Error is bad.')
})