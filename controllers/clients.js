'use strict'

var Client = require('../models/clients');

var bcrypt = require('bcrypt-nodejs')

var jwte = require('../services/jwte');

var multipary = require('connect-multiparty');

function prueba(req,res){
    res.status(200).send({message: 'Probando el controlador del cliente'});
}

function listar(req,res){
    
    Client.find({},(err,list)=>{
        if(err){
            res.status(500).send({message: 'No puede listar los clientes'});
        }else{
            res.status(200).send({list});
        }
    });
}

function login(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Client.findOne({email: email.toLowerCase()},(err,client)=>{
        if(err){
            res.status(500).send({message: 'No puede iniciar sesion'});
        }else{
            if(client){
                bcrypt.compare(password, client.password,(err,check)=>{
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({
                                token: jwte.createToken(client)
                            });
                        }else{
                            res.status(200).send({client});
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse'});
                    }
                });
            }else{
                res.status(404).send({message: 'No se ha podido encontrar al cliente'});
            }
        }
    });
}

function saveClient(req,res){
    var client = new Client();
    var params = req.body;

    if(params.email && params.password){
        client.name = params.name;
        client.surname = params.surname;
        client.email = params.email;
        client.role = params.role;

        Client.findOne({email: client.email.toLowerCase()},(err, issetClient)=>{
            if(err){
                res.status(500).send({message: 'Error, el cliente no puede agregarse correctamente'});
            }else{
                if(!issetClient){
                    bcrypt .hash(params.password,null,null,function(err,hash){
                        client.password = hash;

                        client.save((err, clientStored)=>{
                            if(err){
                                res.status(500).send({message: 'Error al ingresar un cliente'});
                            }else{
                                if(!clientStored){
                                    res.status(404).send({message: 'No puede ingresar un cliente'});
                                }else{
                                    res.status(200).send({client: clientStored});
                                }
                            }
                        });
                    });
                }else{
                    res.status(200).send({message: 'El usuario ya existe'});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Introduce los datos correctamente'});
    }
}

function editClient(req,res){
    var id = req.params.id;
    var update = req.body;

    Client.findByIdAndUpdate(id,update,{new:true},(err,edit)=>{
        if(err){
            res.status(500).send({message: 'No se puede editar el usuario'});
        }else{
            if(!edit){
                res.status(404).send({message: 'El cliente no existe o no coincide con su identificador'});
            }else{
                res.status(200).send({edit});
            }
        }
    });
}

function dropClient(req,res){
    var id = req.params.id;

    Client.findByIdAndDelete(id,(err,eliminar)=>{
        if(err){
            res.status(500).send({message: 'No se puede eliminar el cliente'});
        }else{
            if(!eliminar){
                res.status(404).send({message: 'El usuario ya esta eliminado o no coincide con su identificador'});
            }else{
                res.status(200).send({message: 'Cliente eliminado correctamente'});
            }
        }
    });
}

module.exports = {
    prueba,
    saveClient,
    editClient,
    dropClient, 
    listar,
    login
}