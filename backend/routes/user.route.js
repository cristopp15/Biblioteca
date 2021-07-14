'use strict'

var express = require('express');
var UserController = require('../controllers/user.controller');
var mdAuth = require('../middleware/authenticated');
const { update } = require('../models/user.model');
var api = express.Router();

// User 
api.post('/register', UserController.register);
api.post('/login', UserController.login);
api.put('/updateUser/:id', mdAuth.ensureAuthAdmin, UserController.updateUser);
api.delete('/deleteUser/:id', mdAuth.ensureAuthAdmin, UserController.deleteUser);
api.get('/users',  UserController.listUsers);
api.get('/getUser/:idU',  UserController.getUser);


module.exports = api;