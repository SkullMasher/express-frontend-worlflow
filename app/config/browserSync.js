module.exports = function (bs, appPath, sass, path, chalk, dateFormat, Promise, fs) {
  // console.log for 1337 h4X0r
  let log = console.log.bind(console)

  // Reload all browser on HTML change
  bs.watch(path.join(appPath.appDir, '**.html')).on('change', function () {
    log('Watching ' + path.join(appPath.appDir, '*.html') + ' for changes.')
    bs.notify("<span color='green'>HTML Reloaded</span>", 2000)
    bs.reload()
  })

  // Reload all browser on JS change
  // bs.watch(path.join(appPath.appDir, appPath.jsDir, '**.js')).on('change', function () {
  //   log('Watching ' + path.join(appPath.appDir, appPath.jsDir, '**.js') + 'for changes.')
  //   bs.notify("<span color='green'>JS Reloaded</span>", 2000)
  //   bs.reload()
  // })

  // Specific compilation for SASS file
  bs.watch(path.join(appPath.appDir, appPath.sassDir, '**.scss'), function (event, file) {
    log('Watching' + path.join(appPath.appDir, appPath.sassDir, '**.scss') + ' for changes.')
    if (event === 'change') {
      sass.render({
        file: path.join(appPath.appDir, appPath.sassDir, 'style.scss'),
        outputStyle: 'expanded',
        outFile: path.join(appPath.appDir, appPath.cssDir, 'style.css'),
        sourceMap: true
      }, function (error, result) {
        if (error) {
          // Pretty Debug Message on sass error
          let nowFormat = dateFormat(new Date(), 'HH:MM:ss')

          log(chalk.red('[SASS ERROR ' + nowFormat + '] ') + error.file)
          log(chalk.red('[SASS ERROR ' + nowFormat + '] ') + 'On line ' + chalk.red(error.line) + ' at column ' + chalk.red(error.column))
          log(chalk.red('[SASS ERROR ' + nowFormat + '] ') + error.message)
        } else {
          // Creating css style files
          fs.writeFile(path.join(appPath.appDir, appPath.cssDir, 'style.css'), result.css, function (err) {
            if (!err) {
              // Creating css map file WELCOME TO CALLBACK HELL !
              fs.writeFile(path.join(appPath.appDir, appPath.cssDir, 'style.map.css'), result.map, function (err) {
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
          bs.reload(appPath.appDir + 'css/style.css')
        }
      })
    }
  })
}
