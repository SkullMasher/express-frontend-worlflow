'use strict'

const express           = require('express')
const sassMiddleware    = require('node-sass-middleware')
const path              = require('path')
const postcssMiddleware = require('postcss-middleware')
const autoprefixer      = require('autoprefixer')
const chalk             = require('chalk')
const cons              = require('consolidate')
const app               = express()


// set .html as the default extension 

const appDir = 'app'
const buildDir = 'build'

const routes = require(__dirname + '/' + appDir + '/routes/routes')(app)

app
  .engine('html', cons.hogan)
  .set('view engine', 'html')
  .set('views', __dirname + '/' + appDir + '/views')
  .use(sassMiddleware({
    /* Options */
    src: appDir,
    dest: buildDir,
    debug: true,
    outputStyle: 'expended',
    sourceMap: true,
    prefix: '/prefix' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  }))
  .use(postcssMiddleware({
    plugins: [
      /* Plugins */
      autoprefixer({
        /* Options */
      })
    ],
    src: function(req) {
      return path.join(buildDir, req.url);
    }
  }))
  .use('/css', express.static('app/css'))
  .use('/js', express.static('app/js'))
  .use('/img', express.static('app/img'))

let server = app.listen(3000, function () {
    console.log('Dev server started on ' + chalk.cyan('http://localhost:' + server.address().port))
})

