'use strict';

// Import Modules =========================================================================
var mongoose = require('mongoose');

// Create Schemas =========================================================================
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
    text: String,
    done: boolean
});

// Create Models =========================================================================
var ToDo = mongoose.model('ToDo', toDoSchema);

// Export =========================================================================
exports.ToDo = ToDo;