var assert = require('assert')

var dftOpts = {}
var hasWindow = typeof window !== 'undefined'
var hasIdle = hasWindow && window.requestIdleCallback

module.exports = onIdle

function onIdle (cb, opts) {
  opts = opts || dftOpts

  assert.equal(typeof cb, 'function', 'on-idle: cb should be type function')
  assert.equal(typeof opts, 'object', 'on-idle: opts should be type object')

  if (hasIdle) {
    window.requestIdleCallback(function () {
      window.requestAnimationFrame(cb)
    }, opts)
  } else if (hasWindow) {
    window.requestAnimationFrame(cb)
  }
}
