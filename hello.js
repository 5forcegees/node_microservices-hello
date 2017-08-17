var path = require('path'),
    responseTransformer = require(path.resolve('./utilities/transformer.js')).responseTransformer,
    logging = require('logging')(),
    generalLogger = logging.general,
    transactionLogger = logging.transaction,
    logTypes = logging.logTypes;

module.exports = function hello(options) {
    var seneca = this;

    seneca.add({init: 'hello'}, init);
    seneca.add({service: 'hello'}, helloHandler);

    function init(msg, respond) {
        // Can add logging stuff here
        respond();
    };

}

function helloHandler(args, done) {

    generalLogger.log.trace("hello received request: ", args);

    responseTransformer(args)
        .then(function (transformedResponse) {

            generalLogger.log.trace("\nhello returning transformedResponse:\n", transformedResponse);
            done(null, {result: transformedResponse});
        })
        .catch(function (err) {
            generalLogger.log.error(logTypes.fnInside({err: err}), `hello got err`);

            done(null, {err: err});
        })
}