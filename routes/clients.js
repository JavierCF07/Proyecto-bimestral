'use strict' 

var express = require('express');
var ClientController = require('../controllers/clients');
var ProductController = require('../controllers/products');
var CategoryController = require('../controllers/categories');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/prueba',ClientController.prueba);

api.post('/loginCliente',ClientController.login);

api.put('/actualizarCliente/:id',ClientController.editClient);

api.delete('/eliminarCliente',ClientController.dropClient);

//---------------------------------------Category-----------------------------------

api.get('/listarProducto/:id',ProductController.listarPorCategoria);

api.get('/listarCategorias',CategoryController.listar);

//------------------------------------------Cliente--------------------------------

api.get('/BuscarPorNombre/:name',ProductController.listar);


module.exports = api;
