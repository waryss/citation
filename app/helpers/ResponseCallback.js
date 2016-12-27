// imports
var logger = require('winston'),
    HTTP_CODE = {
        SUCCESS: 200,
        MISSING_PARAMETER: 400,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500
    },
    MESSAGE = {
        SUCCESS: "Process successfully completed",
        UNDEFINED_ERROR: "Undefined error"
    },
    SEVERITY = {
        WARN: "WARN",
        ERROR: "ERROR",
        FATAL: "FATAL",
        SUCCESS: "SUCCESS"
    },
    RETURN_CODE = {
        ERR_TEC_GLOBAL: "An error occured",
        SUCCESS: "SUCCESS"
    };

function onSuccess(res, data) {
    var result = {};

    result.returnCode = RETURN_CODE.SUCCESS;

    result.message = MESSAGE.SUCCESS;

    result.severity = SEVERITY.SUCCESS;

    result.data = data;

    logger.debug('Appel au webservice OK', res.originalUrl, JSON.stringify(result));

    res.status(HTTP_CODE.SUCCESS).json(result);
}

function onError(res, code, error) {
    if (!error.returnCode) {
        error.returnCode = code;
    }
    if (!error.message) {
        error.message = MESSAGE.UNDEFINED_ERROR;
    }
    if (!error.severity) {
        error.severity = SEVERITY.ERROR;
    }

    if (error.severity === SEVERITY.WARN) {
        logger.warn('Appel au webservice KO', res.originalUrl, JSON.stringify(error));
    } else {
        logger.error('Appel au webservice KO', res.originalUrl, JSON.stringify(error));
    }

    res.status(code).json(error);
}

function onCall(res) {
    return function (err, data) {
        if (!err) {
            onSuccess(res, data);
        } else {
            onError(res, HTTP_CODE.INTERNAL_ERROR, {
                "returnCode": err.returnCode,
                "message": err.message,
                "severity": SEVERITY.ERROR
            });
        }
    };
}

exports.onCall = onCall;