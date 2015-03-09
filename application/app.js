var express = require('express');
var database = require('./database');

var app = express();

app.use(express.static(__dirname + '/../public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/fetch/:expr', function(req, res){
  var expression = req.params.expr;
  var hasOnlyLetters = /[\W]/;
  if (hasOnlyLetters.test(expression)){
    res.send([]);
  }
  else{
    database.find({acronym: new RegExp('^'+expression)}, function(error, data){
      res.send(data);
    });
  }
});

module.exports = app;