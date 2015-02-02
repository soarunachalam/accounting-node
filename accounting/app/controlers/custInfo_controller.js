
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
	
	createCustomer : function (req, res) {
		if (!req.body) return res.sendStatus(400)
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
		req.models.customerinfo.find({ name: customerInfo["name"] }, function (err, existingCustomers) {
			// SQL: "SELECT * FROM person WHERE name = 'given name'"

			console.log("Existing customer with name %s found: %d", customerInfo["name"], existingCustomers.length);
			customerInfo["state"] = "Existing";
			res.setStatus(200);
			res.send(customerInfo);
			return;
		});

		req.models.customerinfo.create(customerInfo, function(err, results) {
			if(err){
				console.log("Error in creating the entry" + err);
				res.sendStatus(404);
				return;
			}
			else{
				console.log("Updated customer to DB");
				customerInfo["state"] = "Added";
				//console.log(customerInfo);		
				res.sendStatus(200);
				return;
			}
		});
		
	}
};