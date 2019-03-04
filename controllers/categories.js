'use strict'

var Category = require('../models/categories');
var Product = require('../models/products');

var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');

function prueba(req,res){
    res.status(200).send({message: 'Probando el controlador de Categorias'});
}

function saveCategories(req,res){
    var category = new Category();
    var params = req.body;

    if(params.name){
        category.name = params.name;


        Category.findOne({name: category.name},(err,issetCategory)=>{
            if(err){
                res.status(500).send({message: 'No puede agregar una categoria'});
            }else{
                if(!issetCategory){
                    category.save((err, categoryStored)=>{
                        if(err){
                            res.status(500).send({message: 'Error al intentar ingresar una nueva categoria'});
                        }else{
                            if(!categoryStored){
                                res.status(404).send({message: 'No puede ingresar la categoria'});
                            }else{
                                res.status(200).send({category: categoryStored});
                            }
                        }
                    });
                }else{
                    res.status(200).send({message: 'El usuario ya existe'});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Ingrese los datos correctamente'});
    }
}

function editCategory(req,res){
    var id = req.params.id;
    var update = req.body;

    Category.findByIdAndUpdate(id,update,{new:true},(err,edit)=>{
        if(err){
            res.status(500).send({message: 'No puede editar la categoria'});
        }else{
            if(!edit){
                res.status(404).send({message: 'La categoria no coincide con su identificador'});
            }else{
                res.status(200).send({edit});
            }
        }
    });
}

function dropCategory(req,res){
    var id = req.params.id;

    Category.findByIdAndDelete(id,(err,dele)=>{
        if(err){
            res.status(500).send({message: 'No puede eliminar la categoria'});
        }else{
            if(!dele){
                res.status(404).send({message: 'Asegurese que la categoria que quiere eliminar coincida con su id'});
            }else{
                res.status(200).send({message: 'Categoria eliminada correctamente'});
            }
        }
    });
}

function EliminarPorDefault(req,res){
    var id = req.params.id;

    //console.log(req.category.sub);

    Category.findByIdAndDelete(id,(err,dele)=>{
        if(Category == null){
            params.product.category = '5c7c11af4cb02d101cb5826f';
        }
        if(err){
            res.status(500).send({message: 'No puede eliminar la categoria'});
        }else{
            if(!dele){
                res.status(404).send({message: 'Asegurese que la categoria que quiere eliminar coincida con su id'});
            }else{
                res.status(200).send({message: 'Categoria eliminada correctamente'});
            }
        }
    });
}

function listar(req,res){
    Category.find({},(err,list)=>{
        if(err){
            res.status(500).send({message: 'No puede listar la categoria'});
        }else{
            res.status(200).send({list});
        }
    });
}


module.exports = {
    prueba,
    listar,
    saveCategories,
    editCategory,
    dropCategory,
    EliminarPorDefault
}
