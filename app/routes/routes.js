let lodrCtrl = require('../controllers/lodr.js')

module.exports = function (app) {
  let pageTitle = 'My awesome app'

  app
    .get('/', function (req, res) {
      res.render('index', {
        title: pageTitle
      })
    })
    .get('/lodr', function (req, res) {
      res.render('lodr', {
        title: 'Custom page title',
        data: lodrCtrl
      })
    })
}
