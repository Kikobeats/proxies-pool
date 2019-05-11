'use strict'

const test = require('ava')
const got = require('got')

const createTunnel = require('..')

const proxies = [process.env.PROXY_ONE, process.env.PROXY_TWO]

const { parseUri } = createTunnel

test('do a request', async t => {
  const tunnel = createTunnel(proxies)
  t.is(tunnel.index(), 0)
  t.deepEqual(tunnel.current(), parseUri(proxies[0]))
  const { statusCode } = await got('http://lumtest.com/echo.json', {
    agent: tunnel(),
    json: true
  })

  t.is(statusCode, 200)
  t.is(tunnel.index(), 1)
  t.deepEqual(tunnel.current(), parseUri(proxies[1]))
})
