# luminati-tunnel

![Last version](https://img.shields.io/github/tag/Kikobeats/luminati-tunnel.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/luminati-tunnel/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/luminati-tunnel)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/luminati-tunnel.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/luminati-tunnel)
[![Dependency status](https://img.shields.io/david/Kikobeats/luminati-tunnel.svg?style=flat-square)](https://david-dm.org/Kikobeats/luminati-tunnel)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/luminati-tunnel.svg?style=flat-square)](https://david-dm.org/Kikobeats/luminati-tunnel#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/luminati-tunnel.svg?style=flat-square)](https://www.npmjs.org/package/luminati-tunnel)

> HTTP/HTTPS tunnel proxy for luminati.io using round robin strategy.

## Install

```bash
$ npm install luminati-tunnel --save
```

## Usage

The instance is a function that returns a different proxy tunnel every time you call it, using [round robin](https://en.wikipedia.org/wiki/Round-robin_DNS) algorithm.

```js
const luminatiTunnel = require('luminati-tunnel')

const proxies = [ 'proxy1', 'proxy2', 'proxy3' ]
const tunnel = createTunnel(proxies)
const url = 'http://lumtest.com/echo.json'

;(async () => {
  // => it uses 'proxy1'
  await got(url, {
    agent: tunnel(),
    json: true
  })

  // => it uses 'proxy2'
  await got(url, {
    agent: tunnel(),
    json: true
  })

  // => it uses 'proxy3'
  await got(url, {
    agent: tunnel(),
    json: true
  })

  // => it uses 'proxy1'
  await got(url, {
    agent: tunnel(),
    json: true
  })
})()
```

## API

### `tunnel = luminatiTunnel(proxies, [fromIndex])`

#### proxies

*Required*<br>
Type: `array`

A collection of the proxy IPs to use.

You can get it from your [luminati.io](https://luminati.io/) control panel.

![](https://luminati-holanetworksltd.netdna-ssl.com/www/lum/pub/img/ip_list.png?md5=22129-f8b3b8e5)

Read more at [documentation](https://luminati.io/faq#download-ips).

#### fromIndex

Type: `number`<br>
Default: `0`

It specifies the position of the `proxies` collection to start.

### `tunnel`

The instance is a function that returns a different proxy tunnel every time you call it, using [round robin](https://en.wikipedia.org/wiki/Round-robin_DNS) algorithm.

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

**luminati-tunnel** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/luminati-tunnel/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/luminati-tunnel/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
