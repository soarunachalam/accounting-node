var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var cons = require('consolidate');
var url = require('url');

var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.engine('dust', cons.dust);
app.set('view engine', 'dust');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(bodyparser.json())

app.listen(9000, function(){
	console.log("Server started");
	});

app.get('/customer-information', function(req, res){
	var user = {				
					"orgDetails": {
					  "name": "Somu",
					  "addr1": "9 Harrington Road",
					  "addr2": "Ram Nagar",
					  "town": "Sivagangai",
					  "phone":"04575234093"
					},
					"primeDetails":{
					  "name": "Somu",
					  "phone":"8939901380"
					}
				};
		
	res.render("customerinfo", {"customerInfo":{}});
});

app.post('/customer-information', urlencodedParser, function (req, res) {
	if (!req.body) return res.sendStatus(400)
	console.log(req.body);
	res.sendStatus(404);
});	