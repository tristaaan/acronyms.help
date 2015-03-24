var express = require('express');
var database = require('./database');
var limitedArray = require('./limitedArray');

var app = express();
var limArray = limitedArray(8);

app.use(express.static(__dirname + '/../public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/fetch/:expr', function(req, res){
  var expression = req.params.expr.trim();
  var hasOnlyAlphanumeric = /[\W]/;
  if (hasOnlyAlphanumeric.test(expression)){
    res.send([]);
  }
  else{
    database.find({acronym: new RegExp('^'+expression, 'i')}, function(error, data){
      if(error){
        console.log(error);
      }
      else{
        res.send(data);
        limArray.push(data[Math.floor(Math.random()*data.length)]);
      }
    });
  }
});

app.get('/recents', function(req, res){
  res.send(limArray.arr);
});

module.exports = app;