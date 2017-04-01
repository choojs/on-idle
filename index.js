var hasWindow = typeof window !== 'undefined'
var hasIdleCallback = hasWindow &&
  typeof window.requestIdleCallback !== 'undefined'

module.exports = onIdle

function onIdle (cb) {
  if (hasIdleCallback) {
    window.requestIdleCallback(function () {
      window.requestAnimationFrame(cb)
    })
  } else if (hasWindow) {
    window.requestAnimationFrame(cb)
  }
}
