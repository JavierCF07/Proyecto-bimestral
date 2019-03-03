'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas
var admin_routes = require('./routes/admins');
var client_routes = require('./routes/clients');
var category_routes = require('./routes/categories');
var product_routes = require('./routes/products');

//Middlewares de body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Rutas del body parser
app.get('/prueba', (req, res)=>{
    res.status(200).send({message: 'Probando nuestro servidor'});
});

// rutas
app.use('/v1', admin_routes);
app.use('/v2',client_routes);
app.use('/v3',category_routes);
app.use('/v4',product_routes);
//Cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

module.exports = app;