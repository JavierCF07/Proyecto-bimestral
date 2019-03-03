'use strict'

var app = require('./app');
var mongoose = require('mongoose');
var port = process.env.port || 3690;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Proyecto-Bimestral',{useNewUrlParser:true})

.then((err,res)=>{
    console.log('conexion a la base de datos realizada correctamente');

    app.listen(port,()=>{
        console.log('El servidor local de node y Express estan corriendo exitosamente');
    })
})

.catch(err => console.log(err));