// source : lib/routes/index.js

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

// Requires module dependencies installed using NPM.
const errors = require('restify-errors');
const _ = require('lodash');

// Requires Todo model
const Todo = require('../models/todo');

const routes = (server, log) => {
  // HTTP POST request
  server.post('/todos', (req, res, next) => {
    // Sets data to the body of request
    const data = req.body || {};

    // Creates new Todo object using the data received
    const todo = new Todo(data);

    // Saves todo
    todo.save((err) => {
      // If error occurs, error is logged and returned
      if (err) {
        log.error(err);
        next(new errors.InternalError(err.message));
      } else {
        // If no error, responds with 201 (Created) status code
        res.send(201);
        next();
      }
    });
  });

  // HTTP GET request
  server.get('/todos', (req, res, next) => {
    // Queries DB to obtain todos
    Todo.apiQuery(req.params, (err, docs) => {
      // Errors are logged and returned if there are any
      if (err) {
        log.error(err);
        next(new errors.InvalidContentError(err.errors.name.message));
      } else {
        // If no errors, todos found are returned.
        res.send(docs);
        next();
      }
    });
  });

  // HTTP GET request for individual todos
  server.get('/todos/:todo_id', (req, res, next) => {
    // Queries DB to obtain individual todo based on ID
    Todo.findOne({
      _id: req.params.todo_id
    }, (err, doc) => {
      // Logs and returns error if errors are encountered
      if (err) {
        log.error(err);
        next(new errors.InvalidContentError(err.errors.name.message));
      } else {
        // Responds with todo if no errors are found
        res.send(doc);
        next();
      }
    });
  });

  // HTTP UPDATE request
  server.put('/todos/:todo_id', (req, res, next) => {
    // Sets data to the body of request
    const data = req.body || {};

    if (!data._id) {
      _.extend(data, {
        _id: req.params.todo_id,
      });
    }

    // Finds specific todo based on the ID obtained
    Todo.findOne({
      _id: req.params.todo_id
    }, (err, doc) => {
      // Logs and returns error found
      if (err) {
        log.error(err);
        next(new errors.InvalidContentError(err.errors.name.message));
      } else if (!doc) {
        next(new errors.ResourceNotFoundError('The resource you request could not be found.'));
      } else {
        // Updates todo when the todo with specific ID has been found
        Todo.update({
          _id: data._id
        }, data, (error) => {
          // Logs and returns error
          if (error) {
            log.error(error);
            next(new errors.InvalidContentError(error.errors.message));
          } else {
            // Responds with 200 (OK) status code and todo
            res.send(200, data);
            next();
          }
        });
      }
    });
  });

  // HTTP DELETE request
  server.del('/todos/:todo_id', (req, res, next) => {
    // Removes todo that corresponds with the ID received in the request
    Todo.remove({
      _id: req.params.todo_id
    }, (err) => {
      // Logs and returns error
      if (err) {
        log.error(err);
        next(new errors.InvalidContentError(err.errors.message));
      } else {
        // Responds with 204 (No Content) status code if no errors are encountered
        res.send(204);
        next();
      }
    });
  });
};

module.exports = routes;
