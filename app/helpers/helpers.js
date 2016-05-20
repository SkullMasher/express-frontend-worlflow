const log = require('./log.js')

module.export = function () {
  // Log errors in promise catch block
  let catchPromiseError = function (err) { log(err) }
}
