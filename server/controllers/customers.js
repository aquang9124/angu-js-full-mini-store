var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = {
	index: function(req, res) {
		Customer.find().exec(function(err, customers) {
			if (err) {
				console.log(err);
			} else {
				res.json(customers);
			}
		});
	},

	create: function(req, res) {
		var customer = new Customer({name: req.body.name});

		customer.save(function(err) {
			if (err) {
				res.json(err);
			}
		});
	},

	destroy: function(req, res) {
		console.log(req.params.id);
		Customer.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				console.log(err);
			}
		});
	},
}