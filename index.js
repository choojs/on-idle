var assert = require('assert')

var dftOpts = {}
var hasWindow = typeof window !== 'undefined'
var perf = hasWindow && window.performance
var hasPerf = hasWindow && perf.mark
var hasIdle = hasWindow && window.requestIdleCallback

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
    var uuid = (perf.now() * 100).toFixed()
    var startName = 'start-' + uuid + '-on-idle'
    var endName = 'end-' + uuid + '-on-idle'
    var measureName = 'on-idle [' + uuid + ']'

    perf.mark(startName)
    cb()
    perf.mark(endName)

    perf.measure(measureName, startName, endName)
    perf.clearMeasures(measureName)
    perf.clearMarks(startName)
    perf.clearMarks(endName)
  }
}
