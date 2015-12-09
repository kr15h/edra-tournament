var express = require('express');
var router = express.Router();

/* GET tournament data */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('edra');
  collection.find({}, {}, function(e, docs) {
    res.json(docs);
  });
});

router.put('/', function(req, res) {
  var data = req.body.data;

  var db = req.db;
  var collection = db.get('edra');

  collection.findAndModify({_id: "56682ca888bbd29787bdf12f"}, {$set: req.body}, {multi:false}, function(err, bug){
    if (err) res.json(500, err);
    else if (bug) res.json(bug);
    else res.send(404);
  });
});

module.exports = router;
