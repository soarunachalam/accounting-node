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


app.post('/customer-information', urlencodedParser, function (req, res) {
	if (!req.body) return res.sendStatus(400)
	console.log(req.body);
	res.sendStatus(404);
});	