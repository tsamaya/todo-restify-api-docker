// source:  server.js

// Requires module dependencies downloaded with NPM.
const restify = require('restify');
const winston = require('winston');
const bunyanWinston = require('bunyan-winston-adapter');
const config = require('./config');
const api = require('./lib/api');

// Sets up logging using winston logger.
const log = new winston.Logger({
  transports: [
    // Creates new transport to log to the Console info level logs.
    new winston.transports.Console({
      level: 'info',
      timestamp: new Date().toString(),
      json: true
    })
  ]
});

/**
 * Initialize server
 */
const server = restify.createServer({
  name: config.name,
  version: config.version,
  log: bunyanWinston.createAdapter(log)
});

/**
 * Middleware
 */
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());

// Error handler to catch all errors and forward to the logger set above.
server.on('uncaughtException', (req, res, route, err) => {
  log.error(err.stack);
  res.send(err);
});

// Starts server
server.listen(config.port, api(server, log));
