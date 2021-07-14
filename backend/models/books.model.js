'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var bookSchema = Schema({
    data:{
    author: String,
    title: String,
    edition: Number,
    clues: [],
    description: String,
    themes: [],
    copies: Number,
    available: Number,
    user:[]
}

});

module.exports = moongose.model('book', bookSchema);