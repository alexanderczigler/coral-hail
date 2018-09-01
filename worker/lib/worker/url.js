const screenshotService = require('../service/screenshot')

const RedisSMQ = require("rsmq")
const RSMQWorker = require("rsmq-worker")
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} )

module.exports = {
  initialize: queue => {
    const worker = new RSMQWorker(queue, {rsmq})
    worker.on( "message", function(msg, next, id){
      screenshotService.capture(msg)
      .then(() => {
        next()
      })
      .catch(error => {
        console.log('WORKER unable to screenshot', url)
      })
    })
    
    // optional error listeners
    worker.on('error', function( err, msg ){
        console.log( "ERROR", err, msg.id )
    })
    worker.on('exceeded', function( msg ){
        console.log( "EXCEEDED", msg.id )
    })
    worker.on('timeout', function( msg ){
        console.log( "TIMEOUT", msg.id, msg.rc )
    })
    
    // Start worker.
    console.log('WORKER', 'listening to', queue)
    worker.start()
  }
}
