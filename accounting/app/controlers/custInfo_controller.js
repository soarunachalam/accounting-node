
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

		customerInfo["name"] = req.body.orgName;
		customerInfo["addr1"] = req.body.addr1;
		customerInfo["addr2"] = req.body.addr2;
		customerInfo["town"] = req.body.town;
		customerInfo["area"] = req.body.area;
		customerInfo["phone"] = req.body.orgPhone;

		customerInfo["prime_name"] = req.body.primeryContactName;
		customerInfo["prime_phone"] = req.body.primeryContactPhone;

		//Check if there are existing customers with same name
		var existingCustomers = [];
		var err;
		req.models.customerinfo.find({ name: customerInfo["name"] }, function (err, existingCustomers) {
			// SQL: "SELECT * FROM person WHERE name = 'given name'"
			if(err){
				console.log("Error while querying existing customers");
				res.sendStatus(404);
			}
			if(existingCustomers.length > 0) {
				console.log("Existing customer with name %s found: %d", customerInfo["name"], existingCustomers.length);
				customerInfo["state"] = "Existing";
				console.log(customerInfo);
				return res.status(200).send(customerInfo);
			}
			else {
				req.models.customerinfo.create(customerInfo, function(err, results) {
					if(err){
						console.log("Error in creating the entry" + err);
						return res.sendStatus(404);
					}
					else{
						console.log("Updated customer to DB");
						customerInfo["state"] = "Added";
						console.log(customerInfo);
						return res.status(200).send(customerInfo);
					}
				});
			}
		});
	}
};