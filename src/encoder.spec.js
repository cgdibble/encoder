const { start, stop } = require('./encoder.js')
const { isSuccess, assertSuccess } = require('consistent-failables/failable')
const { get } = require('simple-protocol-http')

describe('encoder.js', () => {
  it('should have a basic endpoint', async function() {
    const appConfig = { appName: 'encoder', port: 8080 }
    await start(appConfig)
    const result = await get(
      `http://localhost:${appConfig.port}/${appConfig.appName}/status`
    )
    await stop()
    assertSuccess(result)
    console.log('result:', result)
  })
})
