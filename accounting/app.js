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
	
	var orgDetailsRecvd = {};
	var primeryContactDetailsRecvd = {};
	var customerInfo = {};
	
	orgDetailsRecvd["name"] = req.body.orgName;
	orgDetailsRecvd["addr1"] = req.body.addr1;
	orgDetailsRecvd["addr2"] = req.body.addr2;
	orgDetailsRecvd["town"] = req.body.town;
	orgDetailsRecvd["area"] = req.body.area;
	orgDetailsRecvd["phone"] = req.body.orgPhone;
	
	primeryContactDetailsRecvd["name"] = req.body.primeryContactName;
	primeryContactDetailsRecvd["phone"] = req.body.primeryContactPhone;
	
	customerInfo["orgDetails"] = orgDetailsRecvd;
	customerInfo["primeryContactDetails"] = primeryContactDetailsRecvd;
		
	customers[customers.length] = customerInfo;
	for(i=0; i<customers.length; i++)
		console.log(customers[i]);
	res.sendStatus(404);
});	