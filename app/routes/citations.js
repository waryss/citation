// imports
var service = require('../services/citations');
var callback = require('../helpers/ResponseCallback').onCall;
var logger = require('winston');


module.exports = function citationsRoutes(app) {

    app.get('/citations/:citation', function (req, res) {
        logger.debug('find citation by id', req.originalUrl);
        service.getCitation(req.params.citation, callback(res));
    });

    app.get('/citations', function (req, res) {
        logger.debug('find all citations', req.originalUrl);
        service.getAllCitations(callback(res));
    });

    app.post('/citations', function (req, res) {
        logger.debug('Add citation', req.originalUrl);
        service.createCitation(req.body, callback(res));
    });

    app.put('/citations/:citation', function (req, res) {
        logger.debug('Update citation', req.originalUrl);
        service.modifyCitation(req.params.citation, req.body, callback(res));
    });

    app.delete('/citations/:citation', function (req, res) {
        logger.debug('Delete citation', req.originalUrl);
        service.removeCitation(req.params.citation, callback(res));
    });
};