module.exports = function(app){
  let pageTitle = 'My awesome app'

  let data = {
    firstName: 'Skullmasher',
    secondName: 'Heartless',
    year: '2016'
  }

  app
    .get('/', function(req, res){
      res.render('index', {
        title: pageTitle
      })
    })
    .get('/lodr', function(req, res){
      res.render('lodr', {
        title: 'Custom page title',
        data: data
      })
    })
}
