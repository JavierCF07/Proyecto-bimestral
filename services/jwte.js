'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_proyecto';

exports.createToken = function(client){
    var payload = {
        sub: client._id,
        name: client.name,
        surname: client.surname,
        email: client.email,
        role: client.role,
        iat: moment().unix,
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}