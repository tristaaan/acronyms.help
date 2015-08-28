var fs = require('fs');
var path = require('path');
var express = require('express');
//var database = require('./database');
var limitedArray = require('./limitedArray');

var app = express();
var limArray = new limitedArray(8, 'acronym');

// discontinued database, see commented block below ~line 47
// var host = process.env.HOST;
// var dbport = process.env.DBPORT;
// var dbname = process.env.DBNAME;
// var username = process.env.USERNAME;
// var pass = process.env.PASSWORD;
// var connection = new database(host, dbport, dbname, username, pass);

var src = [];

app.use('/', express.static(path.join(__dirname, '../public')));

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
    if (src.length == 0){
      fs.readFile('./sampledata/data.json', function(err, data) {
        if (err){
          console.log(err);
          return;
        }
        src = JSON.parse(data);
        sendData(res, expression);
      });
    }
    else{
      sendData(res, expression);
    }
    // if you have a database uncommend this and others, 
    // for now reading the file should be ok
    // connection.find({acronym: new RegExp('^'+expression, 'i')}, function(error, data){
    //   if(error){
    //     console.log(error);
    //   }
    //   else{
    //     res.send(data);
    //     if (data.length > 0){
    //       limArray.push(data[Math.floor(Math.random()*data.length)]);
    //     }
    //   }
    // });
  }
});

app.get('/recents', function(req, res){
  res.send(limArray.contents);
});

function sendData(res, expression){
  var list = pick(src, new RegExp('^'+expression, 'i'));
  res.setHeader('Content-Type', 'application/json');
  res.send(list);
  if (list.length > 0){
    limArray.push(randomIndex(list));
  }
}

function randomIndex(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

module.exports = app;