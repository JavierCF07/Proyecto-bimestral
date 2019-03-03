'use strict'

var express = require('express');
var AdminController = require('../controllers/admins');
var md_auth = require('../middlewares/authenticated');

var multipary = require('connect-multiparty');

var api = express.Router();

api.get('/prueba',AdminController.prueba);

api.get('/listar',AdminController.listar);

api.post('/login',AdminController.loginAdmin);

api.post('/agregar',AdminController.saveAdmin);

api.put('/actualizar/:id',AdminController.editAdmin);

api.delete('/eliminar/:id',AdminController.dropAdmin);

// ----------------------------------------------Cliente-----------------------------------------

api.post('/agregarCliente',AdminController.saveClient);

api.put('/actualizarCliente',AdminController.editClient);

api.delete('/eliminarCliente',AdminController.dropClient);

module.exports = api;
