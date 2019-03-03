'use strict'

var express = require('express');
var ProductController = require('../controllers/products');

var api = express.Router();

api.get('/prueba',ProductController.prueba);

module.exports = api;