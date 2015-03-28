var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connection = function(host, port, dbname, username, password){
  mongoose.connect('mongodb://'+username+':'+password+'@'
    + host + ':' + port + '/' + dbname);

  var acronymSchema = new Schema({
    acronym: {type: String, required: true, unique: true},
    meaning: {type: String, required: true},
    type: {type: String, required: true}
  });

  var acronymModel = mongoose.model('Acronym', acronymSchema);
  return acronymModel;
}


module.exports = connection;