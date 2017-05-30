var nanologger = require('nanologger')
var assert = require('assert')

var dftOpts = {}
var log = nanologger('on-idle')
var hasWindow = typeof window !== 'undefined'
var hasPerf = hasWindow && typeof window.performance.mark !== 'undefined'
var hasIdle = hasWindow && typeof window.requestIdleCallback !== 'undefined'

module.exports = onIdle

function onIdle (cb, opts) {
  opts = opts || dftOpts

  assert.equal(typeof cb, 'function', 'on-idle: cb should be type function')
  assert.equal(typeof opts, 'object', 'on-idle: opts should be type object')

  if (hasIdle) {
    window.requestIdleCallback(function () {
      window.requestAnimationFrame(hasPerf ? handler : cb)
    }, opts)
  } else if (hasWindow) {
    window.requestAnimationFrame(cb)
  }

  function handler () {
    var uuid = (window.performance.now() * 100).toFixed()
    var startName = 'start-' + uuid + '-on-idle'
    var endName = 'end-' + uuid + '-on-idle'
    var measureName = 'on-idle [' + uuid + ']'

    window.performance.mark(startName)
    cb()
    window.performance.mark(endName)
    window.performance.measure(measureName, startName, endName)

    var entry = window.performance.getEntriesByName(measureName)[0]
    var duration = entry.duration.toFixed()
    var msg = 'idle callback execution took ' + duration + 'ms'
    if (duration >= 50) log.warn(msg)
    else log.debug(msg)

    window.performance.clearMeasures(measureName)
    window.performance.clearMarks(startName)
    window.performance.clearMarks(endName)
  }
}
