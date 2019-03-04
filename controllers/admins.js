'use strict'

var Admin = require('../models/admins');
var Client = require('../models/clients');

var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');
var jwte = require('../services/jwte');

var multipary = require('connect-multiparty');

function prueba(req, res) {
    res.status(200).send({ message: 'Probando el controlador de Admin' });
}

function listar(req, res) {

    Admin.find({}, (err, list) => {
        if (err) {
            res.status(500).send({ message: 'No se puede listar' });
        } else {
            if (!list) {
                res.status(404).send({ message: 'No se puede' });
            } else {
                res.status(200).send(list);
            }
        }
    });
}

function loginAdmin(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Admin.findOne({ email: email.toLowerCase() }, (err, admin) => {
        if (err) {
            res.status(500).send({ message: 'Error al intentar iniciar sesión' });
        } else {
            if (admin) {
                bcrypt.compare(password, admin.password, (err, check) => {
                    if (check) {
                        if (params.gettoken) {
                            res.status(200).send({
                                token: jwt.createToken(admin)
                            });
                        } else {
                            res.status(200).send({ admin })
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido loguearse' });
                    }
                });
            } else {
                res.status(404).send({ message: 'No se ha podido encontrar el admin' });
            }
        }
    });
}

function saveAdmin(req, res) {
    var admin = new Admin();
    var params = req.body;

    if (params.name && params.password) {
        admin.name = params.name;
        admin.surname = params.surname;
        admin.email = params.email;
        admin.role = params.role;
        admin.role = "ADMIN";

        Admin.findOne({ email: admin.email.toLowerCase() }, (err, issetAdmin) => {
            if (err) {
                res.status(500).send({ message: 'Error, el usuario no puede agregarse correctamente' });
            } else {
                if (!issetAdmin) {
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        admin.password = hash;

                        admin.save((err, adminStored) => {
                            if (err) {
                                res.status(500).send({ message: 'Error al ingresar el nuevo admin' });
                            } else {
                                if (!adminStored) {
                                    res.status(404).send({ message: 'No puede ingresar el usuario' });
                                } else {
                                    res.status(200).send({ admin: adminStored });
                                }
                            }
                        });
                    });
                } else {
                    res.status(200).send({ message: 'El usuario ya existe' });
                }
            }
        });
    } else {
        res.status(200).send({ message: 'Introduce los datos correctamente' });
    }
}

function editAdmin(req, res) {
    var id = req.params.id;
    var update = req.body;

    Admin.findByIdAndUpdate(id, update, { new: true }, (err, edit) => {
        if (err) {
            res.status(500).send({ message: 'No puede editar el admin' });
        } else {
            if (!edit) {
                res.status(404).send({ message: 'El usuario no existe o no coincide con su identificador' })
            } else {
                res.status(200).send({ edit });
            }
        }
    });
}

function dropAdmin(req, res) {
    var id = req.params.id;

    Admin.findByIdAndDelete(id, (err, eliminar) => {
        if (err) {
            res.status(500).send({ message: 'No puede eliminar el admin' });
        } else {
            if (!eliminar) {
                res.status(404).send({ message: 'Error' })
            } else {
                res.status(200).send({ message: 'Admin eliminado correctamente' });
            }
        }
    });
}
//--------------------------------------------------Client---------------------------------------------------

function editClient(req, res) {
    var id = req.params.id;
    var update = req.body;
    var role = req.client.role;

    if (role == 'CLIENT') {
        if (id == req.client.sub) {
            Client.findByIdAndUpdate(id, update, { new: true }, (err, list) => {
                if (err) {
                    res.status(500).send({ message: 'No se puede editar el cliente' });
                } else {
                    res.status(200).send({ list });
                }
            });
        }else {
            res.status(200).send({ message: 'nel' });
        }
    }else {
        res.status(404).send({ message: 'El usuario debe ser Client para modificarlo' });
    }
}

    module.exports = {
        prueba,
        saveAdmin,
        listar,
        editAdmin,
        dropAdmin,
        loginAdmin,

        //-----------Cliente------------
        editClient
    }