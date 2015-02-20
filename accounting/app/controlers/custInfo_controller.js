
module.exports = {
	getPage	: function getPage(req, res){
		console.log("In custInfo getpage");

		/*req.models.person.find({ surname: "Snow" }, function (err, people) {
			// SQL: "SELECT * FROM person WHERE surname = 'Snow'"

			console.log("People found: %d", people.length);
			console.log("First person: %s, age %d", people[0].fullName(), people[0].age);

			people[0].age = 106;
			people[0].save(function (err) {
				// err.msg = "under-age";
			});
		})*/

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
			var existingCustomers = [];
			var err;
			req.models.customerinfo.find({ orgName: customerInfo["orgName"] }, function (err, existingCustomers) {
				// SQL: "SELECT * FROM customerinfo WHERE name = 'given name'"
				if(err){
					console.log("Error while querying existing customers");
					res.sendStatus(404);
				}
				if(existingCustomers.length > 0) {
					var serverReturnData = {};
					console.log("Existing customer with organisation name %s found: %d", customerInfo["orgName"], existingCustomers.length);
					customerInfo["state"] = "Not Added";
					existingCustomers.push(customerInfo);
					serverReturnData["state"] = "existing user";
					serverReturnData["customerInfo"] = existingCustomers;
					return res.status(200).send(serverReturnData);
				}
				else {
					createDBEntry (req, res, customerInfo);
				}
			});
		}
	}
};

function createDBEntry (req, res, customerInfo){
	var serverReturnData = {};
	req.models.customerinfo.create(customerInfo, function(err, results) {
		if(err){
			console.log("Error in creating the entry" + err);
			return res.sendStatus(404);
		}
		else{
			console.log("Updated customer to DB");
			console.log(customerInfo);
			serverReturnData["state"] = "user added";
			serverReturnData["customerInfo"] = customerInfo;
			return res.status(200).send(serverReturnData);
		}
	});
}