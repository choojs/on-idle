var hasWindow = typeof window !== 'undefined'
var hasIdleCallback = hasWindow &&
  typeof window.requestIdleCallback !== 'undefined'

module.exports = onIdle

function onIdle (cb, options) {
  if (hasIdleCallback) {
    window.requestIdleCallback(function () {
      window.requestAnimationFrame(cb)
    }, options)
  } else if (hasWindow) {
    window.requestAnimationFrame(cb)
  }
}
