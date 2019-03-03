'use strict' 

var express = require('express');
var ClientController = require('../controllers/clients');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/prueba',ClientController.prueba);

api.get('/listar',ClientController.listar);

api.post('/agregarCliente',ClientController.saveClient);

api.put('/actualizarCliente/:id',ClientController.editClient);

api.delete('/eliminarCliente/:id',ClientController.dropClient);

module.exports = api;
