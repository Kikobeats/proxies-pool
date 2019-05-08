'use strict'

const createTunnel = require('tunnel')
const Cycled = require('cycled')

const roundRobin = (items, steps) => {
  const list = new Cycled(items)
  if (steps) list.step(steps)
  return list
}

const parseUri = str => {
  const [host, port, user, password] = str.split(':')
  return { host, proxyAuth: `${user}:${password}`, port: Number(port) }
}

module.exports = (proxies = [], fromIndex = 0) => {
  if (!proxies.length) {
    throw TypeError('You need to provide a collection of proxies.')
  }

  const getProxy = roundRobin(proxies.map(parseUri), fromIndex)

  const luminatiTunnel = opts => {
    const proxy = getProxy.current()
    const tunnel = createTunnel.httpsOverHttp({ proxy, ...opts })
    getProxy.next()
    return tunnel
  }

  luminatiTunnel.current = getProxy.current.bind(getProxy)
  luminatiTunnel.index = () => getProxy.index
  luminatiTunnel.next = getProxy.next.bind(getProxy)
  luminatiTunnel.previous = getProxy.previous.bind(getProxy)

  return luminatiTunnel
}

module.exports.roundRobin = roundRobin
module.exports.parseUri = parseUri
