'use strict'

const chalk = require('chalk')
const path = require('path')
const express = require('express')
const consolidate = require('consolidate')
const app = express()
const favicon = require('serve-favicon')
const connrectBrowserSync = require('connect-browser-sync')
const bs = require('browser-sync').create()

const appDir = 'app'
const appPath = {
  buildDir: path.join(appDir, 'build'),
  scssDir: path.join(appDir, 'scss'),
  cssDir: path.join(appDir, 'css'),
  jsDir: path.join(appDir, 'js'),
  viewDir: path.join(appDir, 'views'),
  ctrlDir: path.join(appDir, 'controllers'),
  imgDir: path.join(appDir, 'img')
}

// console.log for 1337 h4X0r
let log = console.log.bind(console)

// Log errors in promise catch block
let catchError = function (err) { log(err) }

// Greeting Message
let greetingMessage = function () {
  log(chalk.red('  #####   '))
  log(chalk.red(' #######  '))
  log(chalk.red('#  ###  # ') + chalk.grey(' The mighty Skull is starting your project.'))
  log(chalk.red('#   #   # '))
  log(chalk.red('######### ') + chalk.grey(' Happy coding !'))
  log(chalk.red(' ### ###  '))
  log(chalk.red('  #####   '))
  log(chalk.red('  # # #   ') + chalk.grey(' Play more, care less, be an heartless'))
}

greetingMessage()

require('./' + appDir + '/config/browserSync')(bs, appPath) // Live reload

app
  .engine('html', consolidate.hogan)
  .set('view engine', 'html')
  .set('views', path.join(__dirname, appDir, '/views'))
  .use(favicon(path.join(__dirname, appPath.imgDir, 'favicon.ico')))
  .use(connrectBrowserSync(bs.init({
    proxy: 'localhost:3000'
  })))
  .use('/css', express.static(path.join(__dirname, appPath.cssDir)))
  .use('/js', express.static(path.join(__dirname, appPath.jsDir)))
  .use('/img', express.static(path.join(__dirname, appPath.imgDir)))

require('./' + appDir + '/routes/routes')(app)

let expressServer = app.listen(3000, function () {
  log('Dev server started on ' + chalk.cyan('http://localhost:' + expressServer.address().port))
})
