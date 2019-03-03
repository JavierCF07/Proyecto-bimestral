'use strict'

var express = require('express');
var CategoryController = require('../controllers/categories');

var api = express.Router();

api.get('/prueba',CategoryController.prueba);



module.exports = api;