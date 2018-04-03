'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db;
if(process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://localhost/bookapi_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookapi');
}
// var Book = require('./models/bookModel.js');
var router = require('./routes/router.js');

app.use('/api', router);

var port = process.env.PORT || 3003;
app.listen(port, function(){
    console.log("Gulp build and server listening on port:", port);
});

// welcome 
app.get('/', function(req, res){
    res.send('<h1>Welcome</h1>');
});

module.exports = app;

