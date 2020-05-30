'use strict'

const tunnel = require('tunnel')
const test = require('ava')
const got = require('got')

const proxiesPool = require('..')

const proxies = [process.env.PROXY_ONE, process.env.PROXY_TWO]

test('do a request', async t => {
  const proxyPool = proxiesPool(proxies, 0, tunnel.httpOverHttp)
  t.is(proxyPool.index(), 0)
  t.deepEqual(proxyPool.current(), proxiesPool.parse(proxies[0]))

  const { statusCode } = await got('https://lumtest.com/echo.json', {
    agent: {
      http: tunnel.httpOverHttp({
        proxy: proxyPool()
      })
    }
  })

  t.is(statusCode, 200)
  t.is(proxyPool.index(), 1)
  t.deepEqual(proxyPool.current(), proxiesPool.parse(proxies[1]))
})
