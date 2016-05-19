'use strict'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const chalk = require('chalk')
const path = require('path')
const dateFormat = require('dateformat')
const express = require('express')
const sass = require('node-sass')
const postcssMiddleware = require('postcss-middleware')
const autoprefixer = require('autoprefixer')
const consolidate = require('consolidate')
const app = express()
const favicon = require('serve-favicon')
// const connrectBrowserSync = require('connect-browser-sync')
// const bs = require('browser-sync').create()

const appPath = {
  appDir: 'app',
  buildDir: 'build',
  sassDir: 'app/sass',
  cssDir: 'app/css',
  jsDir: 'app/js',
  imgDir: 'app/img'
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

// require('./' + appPath.appDir + '/config/browserSync')(bs, appPath, sass, path, chalk, dateFormat, Promise, fs)

app
  .engine('html', consolidate.hogan)
  .set('view engine', 'html')
  .set('views', path.join(__dirname, appPath.appDir, '/views'))
  .use(favicon(path.join(__dirname, appPath.imgDir, 'favicon.ico')))
  // .use(connrectBrowserSync(bs.init({
  //   proxy: 'localhost:3000'
  // })))
  .use('/css', express.static(path.join(__dirname, appPath.cssDir)))
  .use('/js', express.static(path.join(__dirname, appPath.jsDir)))
  .use('/img', express.static(path.join(__dirname, appPath.imgDir)))

const routes = require('./' + appPath.appDir + '/routes/routes')(app)

let expressServer = app.listen(3000, function () {
  log('Dev server started on ' + chalk.cyan('http://localhost:' + expressServer.address().port))
})
