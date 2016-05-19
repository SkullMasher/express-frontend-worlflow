let lodrCtrl = require('../controllers/lodr.js')
let indexCtrl = require('../controllers/index.js')

module.exports = function (app) {
  let pageTitle = 'My awesome app'

  app
    .get('/', function (req, res) {
      res.render('index', {
        title: pageTitle,
        quotes: indexCtrl.quotes,
        topkek: indexCtrl.topkek
      })
    })
    .get('/lodr', function (req, res) {
      res.render('lodr', {
        title: 'Custom page title',
        data: lodrCtrl
      })
    })
}
