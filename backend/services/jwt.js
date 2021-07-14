'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'AGENDA456';

exports.createToken = (user)=>{
    var payload = {
        sub: user._id,
        cui: user.data.cui,
        name: user.data.name,
        lastname: user.data.lastname,
        username: user.data.username,
        email: user.data.email,
        role: user.data.role,
        iat: moment().unix(),
        exp: moment().add(15, "days").unix()
    }
    return jwt.encode(payload, key);
}


