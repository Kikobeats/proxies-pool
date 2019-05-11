const test = require('ava')

const { stringify } = require('..')

test('stringify proxy object into uri', t => {
  t.is(
    stringify({
      host: 'zproxy.lum-superproxy.io',
      port: 22225,
      proxyAuth: 'lum-customer-foo-zone-zone1-ip-0.0.0.0:bar'
    }),
    'zproxy.lum-superproxy.io:22225:lum-customer-foo-zone-zone1-ip-0.0.0.0:bar'
  )
})
