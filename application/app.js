var express = require('express');
var database = require('./database');

var app = express();

app.use(express.static(__dirname + '/../public'));

app.get('/', function(req, res){
	res.sendFile('index.html');
});

app.get('/fetch/:arg', function(req, res){
	database.find({acronym: new RegExp('^'+req.params.arg)}, function(error, data){
		res.send(data);
	});
});

module.exports = app;