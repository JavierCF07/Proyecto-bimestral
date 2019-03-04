'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_proyecto';

exports.createToken = function(product){
    var payload = {
        sub: product._id,
        name: product.name,
        stock: product.stock,
        price: product.price,
        iat: moment().unix,
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}