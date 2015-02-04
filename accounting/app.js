var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cons = require('consolidate');
var url = require('url');

var environment = require('./config/environment');
var routes      = require('./config/routes');
//var models      = require('./app/models/');

var app = express();
environment(app);
routes(app);

app.listen(9000, function(){
	console.log("Server started");
	});	