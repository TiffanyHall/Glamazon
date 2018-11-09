const path = require('path');


module.exports = function(app) {

  app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.get('/css/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/css/style.css'));
  });

  app.get('/js.app.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/js/app.js'));
  });

};
