const app_config_settings = require('application-configuration')().settings,
    seneca = require('seneca')({timeout: app_config_settings.get('/SENECA_TIMEOUT')}),
    clientInfo = app_config_settings.get('/microservicesClientInfo').hello;


seneca.use('hello.js');

seneca.listen({type:clientInfo.type, port:clientInfo.port });
