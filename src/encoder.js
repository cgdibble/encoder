const { failure, success } = require('consistent-failables/failable')

const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
// const bodyParser = require('koa-bodyparser')
let server

const statusCheck = function*(next) {
  this.body = 'running'
  this.status = 200
  console.log('HELLO HELLO')
}

router.get('/encoder/status', statusCheck)

app.use(router.routes()).use(router.allowedMethods())

const start = async function(config) {
  server = app.listen(config.port, (err, data) => {
    if (err) return failure(err.toString())
    console.log(`${config.appName} listening on port ${config.port}`)
    return success()
  })
}

const stop = async function() {
  if (!server) return success()
  server.close(err => {
    if (err) return failure(err.toString())
    return success()
  })
}

module.exports = {
  start,
  stop,
}
