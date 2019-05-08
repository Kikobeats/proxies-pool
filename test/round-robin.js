const test = require('ava')

const { roundRobin } = require('..')

test('always get a different item in a round robin way', t => {
  const list = roundRobin([1, 2, 3])
  t.is(list.current(), 1)
  t.is(list.next(), 2)
  t.is(list.next(), 3)
  t.is(list.current(), 3)
  t.is(list.next(), 1)
})

test('starts from an index', t => {
  t.is(roundRobin([1, 2, 3], 0).current(), 1)
  t.is(roundRobin([1, 2, 3], 1).current(), 2)
})
