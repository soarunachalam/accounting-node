var controllers = require('../app/controlers/');

module.exports = function (app) {
	app.get('/customer-information', controllers.custInfo.getPage); 
};