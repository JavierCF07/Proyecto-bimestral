'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaClient = Schema({
    name: String,
    surname: String,
    email: String,
    role: String,
    password: String
});

module.exports = mongoose.model('Client', SchemaClient);