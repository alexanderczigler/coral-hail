const Screenshot = require('url-to-screenshot')
const moment = require('moment')
const fs = require('fs')

module.exports = {
  capture: url => {
    console.log('SCREENSHOT SERVICE', 'capture', url)
    return new Screenshot(url)
      .width(800)
      .height(600)
      .clip()
      .capture()
      .then(img => {
        // TODO: Save somewhere not hard coded.
        fs.writeFileSync('/home/ilix/Desktop/' + moment().format('MMMM Do YYYY, h:mm:ss a') + '.png', img)
        return Promise.resolve()
      })
      .catch(error => {
        console.log('SCREENSHOT SERVICE', 'error', error)
        return Promise.reject(error)
      })
  }
}