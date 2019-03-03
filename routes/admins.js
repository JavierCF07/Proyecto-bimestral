'use strict'

var express = require('express');
var AdminController = require('../controllers/admins');
var ClientController = require('../controllers/clients');
var CategoryController = require('../controllers/categories');
var ProductController = require('../controllers/products');

var md_auth = require('../middlewares/authenticated');
var md_aut = require('../middlewares/authenticateded');

var multipary = require('connect-multiparty');

var api = express.Router();

api.get('/prueba',AdminController.prueba);

api.get('/listarAdmin',AdminController.listar);

api.post('/loginAdmin',AdminController.loginAdmin);

api.post('/agregarAdmin',AdminController.saveAdmin);

api.put('/actualizarAdmin/:id',AdminController.editAdmin);

api.delete('/eliminarAdmin/:id',AdminController.dropAdmin);

// ----------------------------------------------Cliente-----------------------------------------
api.get('/listarCliente',ClientController.listar);

api.post('/agregarCliente',ClientController.saveClient);

api.put('/ACT/:id',md_aut.ensureAut,AdminController.editClient);

//----------------------------------------------Category-------------------------------------------
api.get('/listarCategoria',CategoryController.listar);

api.post('/agregarCategoria',CategoryController.saveCategories);

api.put('/actualizarCategoria/:id',CategoryController.editCategory);

api.delete('/eliminarCategoria/:id',CategoryController.dropCategory);

//----------------------------------------------Product--------------------------------------------

api.post('/agregarProducto/:id',ProductController.saveProduct);

module.exports = api;
