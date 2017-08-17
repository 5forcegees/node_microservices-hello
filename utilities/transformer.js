var Promise = require('bluebird'),
    logging = require('logging')(),
    generalLogger = logging.general,
    logTypes = logging.logTypes;


module.exports.responseTransformer = function (parameterObject) {

    return Promise.all([
        nameMapping(parameterObject),
        value2Mapping(parameterObject)
    ])
        .then(function (allResponseData) {
            let returnObject = {};

            returnObject.name = allResponseData[0];
            returnObject.value2 = allResponseData[1];

            generalLogger.log.info(logTypes.fnInside({returnObject: returnObject}), 'hello transformer returnObject');

            return returnObject;
        })
        .catch(function (err) {

            generalLogger.log.debug(logTypes.fnInside({err: err}), 'hello transformer error');

            return {message: "Error transforming response: ", err: err};
        })
}

// return object mapping functions
function nameMapping(parameterObject) {
    if (parameterObject.hasOwnProperty('name')) {
        return parameterObject.name;
    } else {
        return null;
    }
}

function value2Mapping(parameterObject) {
    if (parameterObject.hasOwnProperty('value2')) {
        return parameterObject.value2;
    } else {
        return null;
    }
}
