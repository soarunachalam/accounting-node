
module.exports = {
	getPage	: function getPage(req, res){
		console.log("In custInfo getpage");
		var user = {};
		res.render("customerinfo", {"customerInfo":user});
	},

	createCustomer : function (req, res, next) {
		if (!req.body)
			return res.sendStatus(400)
		console.log("in createCustomer function")
		console.log(req.body);

		var customerInfo = {};
		customerInfo["orgName"] = req.body.orgName;
		customerInfo["addr1"] = req.body.addr1;
		customerInfo["addr2"] = req.body.addr2;
		customerInfo["town"] = req.body.town;
		customerInfo["area"] = req.body.area;
		customerInfo["orgPhone"] = req.body.orgPhone;

		customerInfo["primeContactName"] = req.body.primeContactName;
		customerInfo["primeContactPhone"] = req.body.primeContactPhone;
		customerInfo["state"] = req.body.state;

		if ("Force Add" === customerInfo["state"]){
			createDBEntry (req, res, customerInfo);
		}
		else{
			//Check if there are existing customers with same name
			var results = [];
			var err;
			req.models.customerinfo.find({ orgName: customerInfo["orgName"] }, function (err, results) {
				// SQL: "SELECT * FROM customerinfo WHERE name = 'given name'"
				if(err){
					console.log("Error while querying existing customers");
					res.sendStatus(404);
				}
				if(results.length > 0) {
					var serverReturnData = {};
					console.log("Existing customer with organisation name %s found: %d", customerInfo["orgName"], results.length);
					customerInfo["state"] = "Not Added";
					results.push(customerInfo);
					serverReturnData["state"] = "existing user";
					serverReturnData["customerInfo"] = results;
					return res.status(200).send(serverReturnData);
				}
				else {
					console.log("No existing customer with organisation name %s", customerInfo["orgName"]);
					createDBEntry (req, res, customerInfo);
				}
			});
		}
	},

	getCustomerList : function (req, res, next) {
		console.log("In getCustomerList");

		var serverData = {};		
		getTowns(req, res, serverData);
	},

	updateCustomerList : function (req, res, next) {
		console.log("In updateCustomerList");
	}
};

function createDBEntry (req, res, customerInfo){
	console.log("in createDBEntry");
	var serverReturnData = {};
	var err, results;
	req.models.customerinfo.create(customerInfo, function(err, results) {
		if(err){
			console.log("Error in creating the entry" + err);
			return res.sendStatus(404);
		}
		else{
			console.log("Updated customer to DB");
			serverReturnData["state"] = "user added";
			serverReturnData["customerInfo"] = customerInfo;
			console.log("Sending to client\n" + serverReturnData);
			return res.status(200).send(serverReturnData);
		}
	});
}

function getTowns (req, res, serverData){
	console.log("in getTowns");
	var err, results;
	
	req.db.driver.execQuery("select DISTINCT town from customerInfo order by town", function (err, results) {
		if(err){
			console.log("Error while querying towns");
			serverData["towns"] = {"town":'select'};			
		}
		else{
			results.unshift({"town":'select'});
			serverData["towns"] = results;
		}
		console.log(serverData["towns"]);
		getAreas(req, res, serverData);
	});
}

function getAreas (req, res, serverData){
	console.log("in getAreas");
	var err, results;
	
	req.db.driver.execQuery("select DISTINCT area from customerInfo order by area", function (err, results) {
		if(err){
			console.log("Error while querying areas");
			serverData["areas"] = {"area":'select'};
		}
		else{
			results.unshift({"area":'select'});
			serverData["areas"] = results;
		}		
		console.log(serverData["areas"]);
		getOrgNames(req, res, serverData);
	});
}

function getOrgNames (req, res, serverData){
	console.log("in getOrgNames");
	var err, results;
	
	req.db.driver.execQuery("select DISTINCT orgName from customerInfo order by orgName", function (err, results) {
		if(err){
			console.log("Error while querying areas");
			serverData["orgNames"] = {"orgName":'select'};
		}
		else{
			serverData["orgNames"] = results;
		}		
		console.log(serverData["orgNames"]);
		getCustomerList (req, res, serverData);
	});	
}

function getCustomerList (req, res, serverData){
	console.log("in getCustomerList");
	var err, results;
	
	req.models.customerinfo.all(function (err, results) {
		if(err){
			console.log("Error while querying all customers data");
		}
		else{
			serverData["customerList"] = results;
			console.log(JSON.stringify(results));
		}
		renderPage(req, res, serverData);
	});
}

function renderPage (req, res, serverData){
	console.log("in renderPage");
	//console.log(serverData);
	res.render("customerlist", serverData);
}