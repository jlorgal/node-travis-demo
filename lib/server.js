'use strict';

var express = require('express'),
    http = require('http'),
    expressDomain = require('express-domaining'),
    expressTracking = require('express-tracking'),
    expressLogging = require('express-logging'),
    logger = require('logops');

logger.getContext = function() {
  return process.domain && process.domain.tracking;
};

var app = express();
app.use(expressDomain(logger));
app.use(expressTracking({op: 'test'}));
app.use(expressLogging(logger));

app.get('/test', function(req, res) {
  res.status(200).send();
});

var server = http.createServer(app);
server.listen(3000, function onServerListening() {
  logger.info('Listening at port', 3000);
});

module.exports = app;
