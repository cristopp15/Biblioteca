'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'AGENDA456';

exports.ensureAuth = (req, res, next)=> {

        if(!req.headers.authorization){
            return res.status(403).send({message: 'Petición sin autenticación'});
        }else{
            var token = req.headers.authorization.replace(/['"]+/g, '');
    
            try{
                var payload = jwt.decode(token,payload, key);
                if(payload.exp <= moment().unix()){
                    return res.status(401).send({message: 'Token expirado'});
                }
            }catch(ex){
                return res.status(404).send({message: 'Token no valido'})
            }
    
            req.user = payload;
            next();
        }
   
}

exports.ensureAuthAdmin = (req, res, next)=> {

    
        if(!req.headers.authorization){
            return res.status(403).send({message: 'Petición sin autenticación'});
        }else{
            var token = req.headers.authorization.replace(/['"]+/g, '');
    
            try{
                var payload = jwt.decode(token,payload, key);
                if(payload.exp <= moment().unix()){
                    return res.status(401).send({message: 'Token expirado'});
                }else if(payload.role != "admin"){
                    return res.send({message:"NO ERES ADMINISTRADOR PARA ESTA RUTA"});
                               }
            }catch(ex){
                return res.status(404).send({message: 'Token no valido'})
            }
    
            req.user = payload;
            next();
        }
    
}