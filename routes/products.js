'use strict'

var express = require('express');
var ProductController = require('../controllers/products');
var md_aut = require('../middlewares/authenticatededed');

var api = express.Router();

api.get('/prueba',ProductController.prueba);

api.put('/actualizarStock/:id',ProductController.editStock);

api.put('/actualizarProducto/:id',ProductController.editProduct);

api.delete('/eliminarProducto/:id',ProductController.dropProduct);

api.post('/token', ProductController.tokenStock);

module.exports = api;