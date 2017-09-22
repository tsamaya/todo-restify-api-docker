// source : lib/models/todo.js

// Requires module dependencies installed using NPM.
const mongoose = require('mongoose');
const mongooseApiQuery = require('mongoose-api-query');
// adds created_at and modified_at timestamps for us (ISO-8601)
const timestamps = require('mongoose-timestamp');

// Creates TodoSchema
const TodoSchema = new mongoose.Schema({
  // Title field in Todo collection.
  title: {
    type: String,
    required: true,
    trim: true,
  },
}, { minimize: false });

// Applies mongooseApiQuery plugin to TodoSchema
TodoSchema.plugin(mongooseApiQuery);

// Applies timestamp plugin to TodoSchema
TodoSchema.plugin(timestamps);

// Exports Todo model as a module.

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
