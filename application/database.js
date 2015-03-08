var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/db');

var acronymSchema = new Schema({
  acronym: String,
  meaning: String,
  type: String
});

var acronymModel = mongoose.model('Acronym', acronymSchema)

module.exports = acronymModel;