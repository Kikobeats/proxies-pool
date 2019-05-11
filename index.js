'use strict'

const createTunnel = require('tunnel')
const Cycled = require('cycled')

const roundRobin = (items, steps) => {
  const list = new Cycled(items)
  if (steps) list.step(steps)
  return list
}

const parse = str => {
  const [host, port, user, password] = str.split(':')
  return {
    host,
    proxyAuth: `${user}:${password}`,
    port: Number(port)
  }
}

const stringify = ({ host, proxyAuth, port } = {}) => {
  const [user, password] = proxyAuth.split(':')
  return `${host}:${port}:${user}:${password}`
}

module.exports = (proxies = [], fromIndex = 0) => {
  if (!proxies.length) {
    throw TypeError('You need to provide a collection of proxies.')
  }

  const getProxy = roundRobin(proxies.map(parse), fromIndex)

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
  luminatiTunnel.size = () => proxies.length

  return luminatiTunnel
}

module.exports.roundRobin = roundRobin
module.exports.stringify = stringify
module.exports.parse = parse
