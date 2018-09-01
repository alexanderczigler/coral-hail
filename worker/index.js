const RedisSMQ = require("rsmq")
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} )

const urlWorker = require('./lib/worker/url')
const __QUEUE = 'coral-hail-urls'

// Initialize URL worker.
urlWorker.initialize(__QUEUE)

// for now, let's just put stuff into the queue manually
setTimeout(() => {
  rsmq.sendMessage({qname: __QUEUE, message:'http://ghub.io'}, function (err, resp) {
    if (resp) {
      console.log("Message sent. ID:", resp)
    }

    if (err) {
      console.log('WORKER', 'could not queue url', err)
    }
  })
}, 1000)
