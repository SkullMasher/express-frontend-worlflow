module.exports = function(app){

  app
    .get('/', function(req, res){
      res.send('Main page')
    })
    .get('/lodr', function (req, res) {
      res.send('Hello there ! C\'est Skull')
    })

    //other routes..
}
