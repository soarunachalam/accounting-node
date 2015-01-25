module.exports = {
getPage	: function getPage(req, res){
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
		res.render("customerinfo", {"customerInfo":user});
	}
};