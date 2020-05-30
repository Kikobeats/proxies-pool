'use strict'

const Cycled = require('cycled')

const roundRobin = (items, fromIndex) => {
  const list = new Cycled(items)
  if (fromIndex) list.step(fromIndex)
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

module.exports = (items = [], fromIndex = 0, fn) => {
  const getProxy = roundRobin(items.map(parse), fromIndex)

  const proxyPool = () => {
    const proxy = getProxy.current()
    getProxy.next()
    return proxy
  }

  proxyPool.current = getProxy.current.bind(getProxy)
  proxyPool.index = () => getProxy.index
  proxyPool.next = getProxy.next.bind(getProxy)
  proxyPool.previous = getProxy.previous.bind(getProxy)
  proxyPool.size = () => items.length

  return proxyPool
}

module.exports.roundRobin = roundRobin
module.exports.parse = parse
