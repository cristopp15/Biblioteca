'use strict'

var User = require('./controllers/user.controller');
var {register} = require('./controllers/user.controller');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('./services/jwt');
const {decode} = require('jwt-simple');
const { update } = require('./models/user.model');
var mongoose = require('mongoose');
var port = 4000;
var app = require("./app");

mongoose.Promise = global.Promise;


    
mongoose.connect('mongodb://localhost:27017/BibliotecaDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=>{
        console.log('Conexión a la BD correcta');
        app.listen(port, ()=>{
            console.log('Servidor de express corriendo en el puerto: ', port);
        });
    }).catch(err => {
        console.log('Error al conectarse', err);
    })