var hasIdleCallback = typeof window !== 'undefined' &&
  typeof window.requestIdleCallback !== 'undefined'

module.exports = onIdle

function onIdle (cb) {
  if (hasIdleCallback) {
    window.requestIdleCallback(function () {
      window.requestAnimationFrame(cb)
    })
  } else {
    window.requestAnimationFrame(cb)
  }
}
