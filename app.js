'use strict'

const express = require('express')
const sassMiddleware = require('node-sass-middleware')
const path = require('path')
const app = express()

app.use(sassMiddleware({
  /* Options */
  src: __dirname,
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'expended',
  sourceMap: true,
  prefix: '/prefix' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}))
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use(express.static(path.join(__dirname, 'public')))

app.use(postcssMiddleware({
  plugins: [
    /* Plugins */
    autoprefixer({
      /* Options */
    })
  ],
  src: function(req) {
    return path.join(destPath, req.url);
  }
}));


app.use('/css', express.static('app/css'));
app.use('/js', express.static('app/js'));
app.use('/img', express.static('app/img'));