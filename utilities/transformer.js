var Promise = require('bluebird'),
    logging = require('logging')(),
    generalLogger = logging.general,
    logTypes = logging.logTypes;


module.exports.responseTransformer = function (httpRequestObject) {

    return Promise.all([
        firstNameMapping(httpRequestObject),
        lastNameMapping(httpRequestObject)
    ])
        .then(function (allResponseData) {
            let returnObject = {};

            returnObject.firstname = allResponseData[0];
            returnObject.lastname = allResponseData[1];
            returnObject.outputString =
                "Hello " + capitalizeFirstLetter(returnObject.firstname) + " "
                + capitalizeFirstLetter(returnObject.lastname);

            generalLogger.log.info(logTypes.fnInside({returnObject: returnObject}), 'hello transformer returnObject');

            return returnObject;
        })
        .catch(function (err) {

            generalLogger.log.debug(logTypes.fnInside({err: err}), 'hello transformer error');

            return {message: "Error transforming response: ", err: err};
        })
}

// return object mapping functions
function firstNameMapping(httpRequestObject) {
    if (httpRequestObject && httpRequestObject.hasOwnProperty('query')
        && httpRequestObject.query.hasOwnProperty('firstname') ) {

        return httpRequestObject.query.firstname;
    } else {
        return null;
    }
}

function lastNameMapping(httpRequestObject) {
    if (httpRequestObject && httpRequestObject.hasOwnProperty('query')
        && httpRequestObject.query.hasOwnProperty('lastname') ) {

        return httpRequestObject.query.lastname;
    } else {
        return null;
    }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}