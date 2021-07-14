'use strict'

var express = require('express');
var BookController = require('../controllers/book.controller');
var mdAuth = require('../middleware/authenticated');
const { update } = require('../models/books.model');
var api = express.Router();

api.delete('/deleteBook/:id',mdAuth.ensureAuth, BookController.deleteBook);
api.post('/createBook', BookController.createBook); 
api.put('/updateBook/:id', mdAuth.ensureAuth,BookController.updateBook);
api.get('/Books', BookController.listBooks);
api.get('/showBook/:id', mdAuth.ensureAuth,BookController.showBook);
api.post('/searchBook', mdAuth.ensureAuth,BookController.searchBook);
api.get('/listBookMm', mdAuth.ensureAuth,BookController.listBookMm);
api.get('/listBookMma',mdAuth.ensureAuth, BookController.listBookMma);
api.put('/lendBook/:idU/:id',mdAuth.ensureAuth, BookController.lendBook);
api.put('/returnBook/:idU/:id',mdAuth.ensureAuth, BookController.returnBook);


module.exports = api;  
