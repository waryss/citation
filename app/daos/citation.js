var mongoose = require('mongoose');
var Citation = require('../models/Citation');
var config = require('../config/config').mongodb;

mongoose.connect(config.url);

function save(object, success, error) {
    var citation = new Citation({
        author: object.author,
        source: object.source,
        text: object.text
    });
    citation.save().then(success, error);
}

function update(id, object, success, error) {
    Citation.update({ _id: id }, object).then(success, error);
}

function get(id, success, error) {
    Citation.findById(id).then(success, error);
}

function getAll(success, error) {
    Citation.find().then(success, error);
}

function remove(id, success, error) {
    Citation.remove( { _id: id } ).then(success, error);
}

exports.get = get;
exports.save = save;
exports.getAll = getAll;
exports.remove = remove;
exports.update = update;