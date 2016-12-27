// imports
var express = require('express');
var logger = require('./config/logger');
var config = require('./config/config');
var bodyParser = require('body-parser');

// server creation
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// catch global
app.use(function (err, req, res, next) {
    logger.error(err.stack);
    res.send(500, {
        message: "Une erreur est survenue.",
        detail: err.stack
    });
});

// affichage des temps de réponse
app.use(function (req, res, next) {
    var start = Date.now();
    res.originalUrl = req.originalUrl;
    //noinspection JSUnresolvedFunction
    res.on('finish', function () {
        var duration = Date.now() - start;
        logger.info('[res] %sms %s', duration, req.originalUrl);
    });
    next();
});

// ajout des routes
require('./routes/citations')(app);

// démarrage du serveur
app.listen(config.port, function () {
    logger.info('Démarrage du serveur sur le port %d', config.port);
});