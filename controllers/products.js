'use strict'

var Product = require('../models/products');
var Category = require('../models/categories');

var bcrypt = require('bcrypt-nodejs');

function prueba(req,res){
    res.status(200).send({message: 'Probando el controlador de Productos'});
}

function saveProduct(req,res){
    var product = new Product();
    var params = req.body;

    if(params.name){
        product.name = params.name;
        product.stock = params.stock;
        product.price = params.price;
        product.category = req.params.id;

        Product.findOne({name: product.name},(err,issetProduct)=>{
            if(err){
                res.status(500).send({message: 'No puede agregar un producto'});
            }else{
                if(!issetProduct){
                    product.save((err,productStored)=>{
                        if(err){
                            res.status(500).send({message: 'Error al intentar guardar un producto'});
                        }else{
                            if(!productStored){
                                res.status(404).send({message: 'No puede agregar un producto nuevo'});
                            }else{
                                res.status(200).send({productStored});
                            }
                        }
                    });
                }else{
                    res.status(200).send({message: 'El producto ya existe'});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Ingrese los datos correctamente'});
    }
}


function listar(req,res){
    var name = req.params.name;

    Product.find({name},(err,listar)=>{
        if(err){
            res.status(500).send({message: 'No puede listar los productos'});
        }else{
            res.status(200).send({listar});
        }
    });
}


function listarPorCategoria(req,res){
    var id = req.params.id;

    Product.find({category: id},(err,listar)=>{
        if(err){
            res.status(500).send({message: 'No puede listar los productos'});
        }else{
            res.status(200).send({listar});
        }
    });
}



module.exports = {
    prueba,
    saveProduct,
    listar,
    listarPorCategoria
}