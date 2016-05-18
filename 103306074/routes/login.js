var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    member : null
  });
});

//members test
router.get('/members/:memberId', function(req, res) {
  Member.get(req.params.memberId, function(err, member) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      res.json(member);
    }
  })

});

router.post('/', function(req, res, next) {
  var inputaccount = req.body.logacc;
  var inputpassword = req.body.logpass;
  Member.getbyaccount(inputaccount, function(err, member) {
    if(err || inputpassword != member.password) {
      res.render('loginfail',{
        member : null
      });
    } else {
      req.session.member = member;
      res.redirect('/');
    }
  });
});

router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});


module.exports = router;
