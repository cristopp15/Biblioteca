'use strict'

var express = require('express');
var MagazineController = require('../controllers/magazine.controller');
var mdAuth = require('../middleware/authenticated');
const { update } = require('../models/magazine.model');
var api = express.Router();

api.delete('/deleteMagazine/:id',mdAuth.ensureAuthAdmin, MagazineController.deleteMagazine);
api.post('/createMagazine', MagazineController.createMagazine);
api.put('/updateMagazine/:id', MagazineController.updateMagazine);
api.get('/listMagazines', MagazineController.listMagazines);
api.get('/showMagazine/:id',mdAuth.ensureAuth, MagazineController.showMagazine);
api.get('/searchMagazine',mdAuth.ensureAuth, MagazineController.searchMagazine);
api.get('/listMagazineMm', mdAuth.ensureAuth,MagazineController.listMagazineMm);
api.get('/listMagazineMma', mdAuth.ensureAuth,MagazineController.listMagazineMma);
api.put('/lendMagazine/:idU/lend/:id',mdAuth.ensureAuth, MagazineController.lendMagazine);
api.put('/returnMagazine/:idU/return/:id',mdAuth.ensureAuth, MagazineController.returnMagazine);

module.exports = api;