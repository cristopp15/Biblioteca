'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var magazineSchema = Schema({
    data:{
        author: String,
    title: String,
    edition: Number,
    description: String,
    frequency: String,
    nex: Number,
    themes: [],
    clues: [],
    copies: Number,
    available: Number,
    user: []
    }
});

module.exports = moongose.model('magazine', magazineSchema);