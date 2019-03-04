'use strict'

var Product = require('../models/products');
var Category = require('../models/categories');

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwtee');

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


function editProduct(req,res){
    var id = req.params.id;
    var update = req.body;

    Product.findByIdAndUpdate(id,update,{new:true},(err,edit)=>{
        if(err){
            res.status(500).send({message: 'No se puede editar el stock'});
        }else{
            if(!edit){
                res.status(404).send({message: 'El identificador no coincide'});
            }else{
                res.status(200).send({edit});
            }
        }
    });
}

function editStock(req,res){
    var product = new Product();
    var id = req.params.id;
    var update = req.body;

    if(update.stock){
        product.stock = update.stock;
    
    Product.findByIdAndUpdate(id,update,{new:true},(err,edit)=>{
        if(err){
            res.status(500).send({message: 'No se puede editar el stock'});
        }else{
            if(!edit){
                res.status(404).send({message: 'El identificador no coincide'});
            }else{
                res.status(200).send({edit});
            }
        }
    });
}else{
    res.status(200).send({message: 'No puede modificar otro parametro'});
}
}

function dropProduct(req,res){
    var id = req.params.id;

    Product.findByIdAndDelete(id,(err,drop)=>{
        if(err){
            res.status(500).send({message: 'No puede eliminar'});
        }else{
            if(!drop){
                res.status(404).send({message: 'Error'});
            }else{
                res.status(200).send({message: 'Producto eliminado correctamente'});
            }
        }
    });
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
            if(!listar){
                res.status(404).send({message: 'La categoria no existe'});
            }else{
                res.status(200).send({listar});
            } 
        }
    });
}


function tokenStock(req, res) {
    var params = req.body;
    var name = params.name;

    Product.findOne({ name: name }, (err, product) => {
        if (err) {
            res.status(500).send({ message: 'Error al intentar iniciar sesión' });
        } else {
            if (product) {
                        if (params.gettoken == 'true') {
                            res.status(200).send({
                                token: jwt.createToken(product)
                            });
                        } else {
                            res.status(200).send({ product })
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido loguearse' });
                    }
        }
    });
}

module.exports = {
    prueba,
    saveProduct,
    listar,
    listarPorCategoria,
    editStock,
    tokenStock,
    editProduct,
    dropProduct
}