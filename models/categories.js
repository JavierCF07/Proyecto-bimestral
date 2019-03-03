'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaCategories = Schema ({
    name: String,
});

module.exports = mongoose.model('Categories',SchemaCategories);