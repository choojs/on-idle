var onIdle = require('./')

window.localStorage.logLevel = 'debug'

onIdle(function () {
  var i = 100
  while (--i) console.log('slow message')
})

onIdle(function () {
  console.log('fast message')
})
