var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = {
	index: function(req, res) {
		Product.find().exec(function(err, products) {
			if (err) {
				console.log(err);
			} else {
				res.json(products);
			}
		});
	},

	create: function(req, res) {
		var product = new Product({ product_name: req.body.product_name, qty: req.body.qty, image_url: req.body.image_url, description: req.body.description });

		product.save(function(err) {
			if (err) {
				res.json(err);
			}
		});
	},
}