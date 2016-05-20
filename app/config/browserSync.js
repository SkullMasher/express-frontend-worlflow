const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const chalk = require('chalk')
const path = require('path')
const dateFormat = require('dateformat')
const sass = require('node-sass')
const log = require('../helpers/log.js')

module.exports = function (bs, appPath) {
  // Reload all browser on HTML change
  bs.watch(path.join(appPath.viewDir, '**.html')).on('change', function () {
    bs.notify("<span color='green'>HTML Reloaded</span>", 2000)
    bs.reload()
  })

  // Reload all browser on JS change
  bs.watch(path.join(appPath.jsDir, '**.js')).on('change', function () {
    bs.notify("<span color='green'>JS Reloaded</span>", 2000)
    bs.reload()
  })

  // Compilation of scss file into a css dir
  bs.watch(path.join(appPath.scssDir, '**.scss'), function (event, file) {
    if (event === 'change') {
      sass.render({
        file: path.join(appPath.scssDir, 'style.scss'),
        outputStyle: 'expanded',
        outFile: path.join(appPath.cssDir, 'style.css'),
        sourceMap: true
      }, function (error, result) {
        if (error) {
          log(error)
          // Pretty Debug Message on sass error
          let nowFormat = dateFormat(new Date(), 'HH:MM:ss')

          log(chalk.red('[SASS ERROR ' + nowFormat + '] ') + error.file)
          log(chalk.red('[SASS ERROR ' + nowFormat + '] ') + 'On line ' + chalk.red(error.line) + ' at column ' + chalk.red(error.column))
          log(chalk.red('[SASS ERROR ' + nowFormat + '] ') + error.message)
        } else {
          // Creating css style files
          fs.writeFile(path.join(appPath.cssDir, 'style.css'), result.css, function (err) {
            if (!err) {
              // Creating css map file WELCOME TO CALLBACK HELL !
              fs.writeFile(path.join(appPath.cssDir, 'style.map.css'), result.map, function (err) {
                if (!err) {
                  let nowFormat = dateFormat(new Date(), '[HH:MM:ss]')
                  log(nowFormat + chalk.green(' CSS Reloaded'))
                  bs.notify("<span color='green'>CSS Reloaded</span>", 2000)
                } else {
                  log('Error writting the sourcemap css file')
                  log(err)
                }
              })
            } else {
              log('Error writting the css file')
              log(err)
            }
          })
          // Injecting the CSS change in BrowserSync
          bs.reload(path.join(appPath.cssDir, '/style.css'))
        }
      })
    }
  })

  log('Watching ' + path.join(appPath.scssDir, '**.scss') + ' for changes.')
  log('Compiling css in ' + path.join(appPath.cssDir, '**.scss'))
  log('Watching ' + path.join(appPath.viewDir, '**.html') + ' for changes.')
  log('Watching ' + path.join(appPath.jsDir, '**.js') + 'for changes.')
}
