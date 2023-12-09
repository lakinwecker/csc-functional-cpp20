var QRCode = require('qrcode')

QRCode.toFile(
  'static/qrcode.png',
  'https://github.com/lakinwecker/csc-functional-cpp20',
  {
    light: '#0000', // Transparent background
  },
  function (error) {
    if (error) console.error(error)
    console.log('success!')
  }
)
