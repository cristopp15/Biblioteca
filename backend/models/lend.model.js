'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var lendSchema = Schema({
    user_id: String,
    name: String,
    username: String,
    biblio_id: String,
    title: String,
    author: String
});

module.exports = moongose.model('lend', lendSchema);