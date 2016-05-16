module.exports = function (bs, appPath) {
  // Reload all browser on HTML change
  bs.watch(appPath.appFolderPath + '*.html').on('change', function () {
    bs.notify("<span color='green'>HTML Reloaded</span>", 2000)
    bs.reload()
  })

  // Reload all browser on JS change
  bs.watch(appPath.appFolderPath + appPath.jsFolderName + '**.js').on('change', function () {
    bs.notify("<span color='green'>JS Reloaded</span>", 2000)
    bs.reload()
  })

  // Specific compilation for SASS file
  bs.watch(appPath.appFolderPath + appPath.sassFolderName + '**.scss', function (event, file) {
    if (event === 'change') {
      sass.render({
        file: appPath.appFolderPath + appPath.sassFolderName + 'style.scss',
        outputStyle: 'expanded',
        outFile: appPath.appFolderPath + appPath.cssFolderName + 'style.css',
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
          fs.writeFile(appPath.appFolderPath + appPath.cssFolderName + 'style.css', result.css, function (err) {
            if (!err) {
              // Creating css map file
              fs.writeFile(appPath.appFolderPath + appPath.cssFolderName + 'style.map.css', result.map, function (err) {
                if (!err) {
                  let nowFormat = dateFormat(new Date(), '[HH:MM:ss]')
                  log(nowFormat + chalk.green(' CSS Reloaded'))
                  bs.notify("<span color='green'>CSS Reloaded</span>", 2000)
                } else {
                  log(err)
                }
              })
            } else {
              log('error there')
              log(err)
            }
          })
          // Injecting the CSS change in BrowserSync
          bs.reload(appPath.appFolderPath + 'css/style.css')
        }
      })
    }
  })
}