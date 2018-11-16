var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Mood = mongoose.model('Mood');

router.get('/moods', function(req, res, next) {
  Mood.find(function(err, moods){
    if(err){ return next(err); }
    res.json(moods);
  });
});

router.post('/moods', function(req, res, next) {
  var mood = new Mood(req.body);
  mood.save(function(err, mood){
    if(err){ return next(err); }
    res.json(mood);
  });
});

module.exports = router;
