// imports
var logger = require('winston');
var dao = require('../daos/citation');

function createCitation(object, callback) {
    dao.save(object, function (citation) {
        callback(null, citation);
    }, function (err) {
        logger.error(err);
        err.returnCode = "INVALID_OBJECT";
        err.message = "Can not create citation";
        callback(err, null);
    });
}

function modifyCitation(id, object, callback) {
    dao.update(id, object, function (citation) {
        callback(null, citation);
    }, function (err) {
        logger.error(err);
        err.returnCode = "UNKNOWN_CITATION_ID";
        err.message = "Can not find citation with id " + id;
        callback(err, null);
    });
}

function removeCitation(id, callback) {
    dao.remove(id, function (citation) {
        callback(null, citation);
    }, function (err) {
        logger.error(err);
        err.returnCode = "UNKNOWN_CITATION_ID";
        err.message = "Can not find citation with id " + id;
        callback(err, null);
    });
}

function getCitation(id, callback) {
    dao.get(id, function (citation) {
        callback(null, citation);
    }, function (err) {
        logger.error(err);
        err.returnCode = "UNKNOWN_CITATION_ID";
        err.message = "Can not find citation with id " + id;
        callback(err, null);
    });
}

function getAllCitations(callback) {
    dao.getAll(function (citation) {
        callback(null, citation);
    }, function (err) {
        logger.error(err);
        err.message = "Can not find any citations";
        callback(err, null);
    });
}

exports.getCitation = getCitation;
exports.getAllCitations = getAllCitations;
exports.createCitation = createCitation;
exports.modifyCitation = modifyCitation;
exports.removeCitation = removeCitation;