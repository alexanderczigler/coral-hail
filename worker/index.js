const RedisSMQ = require("rsmq");
const screenshotService = require('./lib/service/screenshot')

const __QUEUE = 'coral-hail-urls'


const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

const RSMQWorker = require("rsmq-worker")
const worker = new RSMQWorker(__QUEUE, {rsmq})

worker.on( "message", function(msg, next, id){
  // process your message
  console.log("Found URL: " + id + msg)
  screenshotService.capture(msg)
  next()
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
worker.start()

// for now, let's just put stuff into the queue manually
setTimeout(() => {
  rsmq.sendMessage({qname: __QUEUE, message:'http://ghub.io'}, function (err, resp) {
    if (resp) {
      console.log("Message sent. ID:", resp);
    }
  });
}, 1000)
