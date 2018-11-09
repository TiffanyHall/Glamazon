const db = require('../models');

module.exports = function(app) {


  app.get('/api/Product', function(req, res) {
    db.Product.findAll({}).then(function(rows) {
      res.json(rows);
    }).catch(function(err) {
      console.log(res);
      res.json({ err: err });
    });
  });

  app.get('/api/Product/:id', function(req, res) {
    db.Product.findOne({ where: {id: req.params.id},
    }).then(function(data) {
      res.json(data);
    }).catch(function(err) {
      res.json({ err: err});
    });
  });

  app.post('/api/Product', function(req, res) {
    db.Product.create(req.body).then(function(rows) {
      res.json({ success: true });
    }).catch(function(err) {
      res.json({ err: err});
    });
  });

  app.put('/api/Product/:id', function(req, res) {
    db.Product.update(req.body,{ where: { id: req.params.id}
    }).then(function() {
      res.json({ success: true });
    }).catch(function(err) {
      res.json({ err: err })
    });
  });

  app.delete('/api/Product/:id', function(req, res) {
    db.Product.destroy({where: { id: req.params.id}
    }).then(function() {
      res.json({ success: true });
    }).catch(function(err) {
      res.json({ err: err });
    });
  });
}
