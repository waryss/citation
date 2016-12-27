var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Citation = new Schema({
    author: String,
    text: String,
    source: String,
    creationDate: { type : Date, default : Date.now }
});

module.exports = mongoose.model('Citation', Citation);