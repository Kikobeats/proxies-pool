const test = require('ava')

const { parseUri } = require('..')

test('parse proxy url into an objet', t => {
  t.deepEqual(
    parseUri(
      'zproxy.lum-superproxy.io:22225:lum-customer-foo-zone-zone1-ip-0.0.0.0:bar'
    ),
    {
      host: 'zproxy.lum-superproxy.io',
      port: 22225,
      proxyAuth: 'lum-customer-foo-zone-zone1-ip-0.0.0.0:bar'
    }
  )
})
