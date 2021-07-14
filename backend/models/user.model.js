'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    data:
    {cui: String,
    name: String,
    lastname: String,
    email: String,
    username: String,
    role: String,
    password: String,
    books: [],
    magazine:[]
}

});

module.exports = mongoose.model('user', userSchema);