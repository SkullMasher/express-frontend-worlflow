'use strict'

const chalk = require('chalk')
const path = require('path')
const express = require('express')
const nodeSass = require('node-sass')
const postcssMiddleware = require('postcss-middleware')
const autoprefixer = require('autoprefixer')
const consolidate = require('consolidate')
const app = express()
const favicon = require('serve-favicon')
const connrectBrowserSync = require('connect-browser-sync')
const bs = require('browser-sync')

const appPath = {
  appDir: 'app',
  buildDir: 'build',
  sassDir: this.appDir + '/sass',
  cssDir: this.appDir + '/css',
  jsDir: this.appDir + '/js',
  imgDir: this.appDir + '/img'
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

require('./' + appPath.appDir + '/config/browserSync')(bs, appPath)

app
  .engine('html', consolidate.hogan)
  .set('view engine', 'html')
  .set('views', path.join(__dirname, appPath.appDir, '/views'))
  .use(favicon(path.join(__dirname, appPath.imgDir, 'favicon.ico')))
  // .use(connrectBrowserSync())
  .use('/css', express.static(path.join(__dirname, appPath.cssDir)))
  .use('/js', express.static(path.join(__dirname, appPath.jsDir)))
  .use('/img', express.static(path.join(__dirname, appPath.imgDir)))

require('./' + appPath.appDir + '/routes/routes')(app)

let expressServer = app.listen(3000, function () {
  log('Dev server started on ' + chalk.cyan('http://localhost:' + expressServer.address().port))
})
