'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_proyecto';

exports.createToken = function(admin){
    var payload = {
        sub: admin._id,
        name: admin.name,
        surname: admin.surname,
        email: admin.email,
        role: admin.role,
        image: admin.image,
        iat: moment().unix,
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}