var controllers = require('../app/controlers/');

module.exports = function (app) {
	app.get('/customer-information', controllers.custInfo.getPage);
	app.post('/customer-information', urlencodedParser, controllers.custInfo.createCustomer);
	app.get('/customer-list', controllers.custInfo.getCustomerList);
	app.get('/customer-list', controllers.custInfo.updateCustomerList);
};