// source : lib/api.js
const mongoose = require('mongoose');
const config = require('../config');
const routes = require('./routes');

const api = (server, log) => {
  mongoose.Promise = global.Promise;

  // Connection Events
  // When connection throws an error, error is logged
  mongoose.connection.on('error', (err) => {
    log.error(`Mongoose default connection error: ${err}`);
    process.exit(1);
  });

  // When connection is open
  mongoose.connection.on('open', (err) => {
    // Error is logged if there are any.
    if (err) {
      log.error(`Mongoose default connection error: ${err}`);
      process.exit(1);
    }

    // Else information regarding connection is logged
    log.info(
      '%s v%s ready to accept connection on port %s in %s environment.',
      server.name,
      config.version,
      config.port,
      config.env
    );

    // Requires routes file
    routes(server, log);
  });

  global.db = mongoose.connect(config.db.uri);
};

module.exports = api;
