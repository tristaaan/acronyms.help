var express = require('express');
var database = require('./database');
var limitedArray = require('./limitedArray');

var app = express();
var limArray = new limitedArray(8, '_id');

var host = process.env.HOST;
var dbport = process.env.DBPORT;
var dbname = process.env.DBNAME;
var username = process.env.USERNAME;
var pass = process.env.PASSWORD;
var connection = new database(host, dbport, dbname, username, pass);

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
    connection.find({acronym: new RegExp('^'+expression, 'i')}, function(error, data){
      if(error){
        console.log(error);
      }
      else{
        res.send(data);
        if (data.length > 0){
          limArray.push(data[Math.floor(Math.random()*data.length)]);
        }
      }
    });
  }
});

app.get('/recents', function(req, res){
  res.send(limArray.contents);
});

module.exports = app;