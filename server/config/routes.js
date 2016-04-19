var customers = require('../controllers/customers.js');
var products = require('../controllers/products.js');
var orders = require('../controllers/orders.js');

module.exports = function(app) {
	app.get('/customers', function(req, res) {
		customers.index(req, res);
	});

	app.post('/customers', function(req, res) {
		customers.create(req, res);
	});

	app.get('/products', function(req, res) {
		products.index(req, res);
	});

	app.post('/products', function(req, res) {
		products.create(req, res);
	});
}