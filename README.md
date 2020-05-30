# proxies-pool

![Last version](https://img.shields.io/github/tag/Kikobeats/proxies-pool.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/proxies-pool/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/proxies-pool)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/proxies-pool.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/proxies-pool)
[![Dependency status](https://img.shields.io/david/Kikobeats/proxies-pool.svg?style=flat-square)](https://david-dm.org/Kikobeats/proxies-pool)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/proxies-pool.svg?style=flat-square)](https://david-dm.org/Kikobeats/proxies-pool#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/proxies-pool.svg?style=flat-square)](https://www.npmjs.org/package/proxies-pool)

> Simple way to handle a pool of proxies using round robin strategy.

## Install

```bash
$ npm install proxies-pool --save
```

## Usage

The instance is a function that returns a different proxy every time you call it, using [round robin](https://en.wikipedia.org/wiki/Round-robin_DNS) algorithm.

```js
const proxiesPool = require('proxies-pool')
const proxies = ['proxy1', 'proxy2', 'proxy3']
const proxyPool = proxiesPool(proxies)
const url = 'http://lumtest.com/echo.json'

const createAgent = proxy => ({
  agent: {
    http: tunnel.httpOverHttp({ proxy })
  }
})

;(async () => {
  // => it uses 'proxy1'
  await got(url, { agent: createAgent(proxyPool()) })

  // => it uses 'proxy2'
  await got(url, { agent: createAgent(proxyPool()) })

  // => it uses 'proxy3'
  await got(url, { agent: createAgent(proxyPool()) })

  // => it uses 'proxy1'
  await got(url, { agent: createAgent(proxyPool()) })
})()
```

## API

### `proxyPool = proxiesPool(proxies, [fromIndex])`

#### proxies

*Required*<br>
Type: `array`

A collection of proxies to use.

You can get it from your [luminati.io](https://luminati.io) control panel or any compatible provider.

![](https://luminati-holanetworksltd.netdna-ssl.com/www/lum/pub/img/ip_list.png?md5=22129-f8b3b8e5)

Read more at [documentation](https://luminati.io/faq#download-ips).

#### fromIndex

Type: `number`<br>
Default: `0`

It specifies the position of the `proxies` collection to start.

### `proxyPool`

The instance is a function that returns a different proxy every time you call it, using [round robin](https://en.wikipedia.org/wiki/Round-robin_DNS) algorithm.

#### .current()

Returns the current proxy tunnel credential.

#### .index()

Returns the current proxy tunnel index from the `proxies` provided.

#### .next()

Returns the next proxy tunnel credential.

#### .previous()

Returns the previous proxy tunnel credential.

#### .size()

Returns the number of proxies in the pool.

## License

**proxies-pool** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/proxies-pool/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/proxies-pool/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
