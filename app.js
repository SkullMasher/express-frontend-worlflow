'use strict'

const chalk             = require('chalk')
const path              = require('path')
const express           = require('express')
const sassMiddleware    = require('node-sass-middleware')
const postcssMiddleware = require('postcss-middleware')
const autoprefixer      = require('autoprefixer')
const consolidate       = require('consolidate')
const app               = express()
const favicon           = require('serve-favicon')

const appDir = 'app'
const buildDir = 'build'
const sassDir = appDir + '/sass'
const cssDir = appDir + '/css'
const jsDir = appDir + '/js'
const imgDir = appDir + '/img'


console.log(path.join(__dirname, imgDir, 'favicon.ico'))

app
  .engine('html', consolidate.hogan)
  .set('view engine', 'html')
  .set('views', __dirname + '/' + appDir + '/views')
  .use(favicon(path.join(__dirname, imgDir, 'favicon.ico')))
  .use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, sassDir),
    dest: path.join(__dirname, cssDir),
    debug: true,
    outputStyle: 'expended',
    sourceMap: true
  }))
  // .use(postcssMiddleware({
  //   plugins: [
  //     /* Plugins */
  //     autoprefixer({
  //       /* Options */
  //     })
  //   ],
  //   src: function(req) {
  //     return __dirname + cssDir;
  //   }
  // }))
  .use('/css', express.static(path.join(__dirname, cssDir)))
  .use('/js', express.static(path.join(__dirname, jsDir)))
  .use('/img', express.static(path.join(__dirname, imgDir)))

const routes = require(__dirname + '/' + appDir + '/routes/routes')(app)

let server = app.listen(3000, function () {
    console.log('Dev server started on ' + chalk.cyan('http://localhost:' + server.address().port))
})
