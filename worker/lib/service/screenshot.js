const Screenshot = require('url-to-screenshot')
const fs = require('fs')
 
module.exports = {
  capture: url => {
    console.log('SCREENSHOT SERVICE', 'capture', url)
    new Screenshot(url)
      .width(800)
      .height(600)
      .clip()
      .capture()
      .then(img => {
        fs.writeFileSync('/home/ilix/Desktop/example.png', img)
        console.log('open example.png')
  })
  }
}