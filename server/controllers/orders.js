var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

module.exports = {
	index: function(req, res) {
		Order.find().exec(function(err, orders) {
			if (err) {
				console.log(err);
			} else {
				res.json(orders);
			}
		});
	},

	create: function(req, res) {
		var order = new Order({ customer_name: req.body.customer_name, order_qty: req.body.order_qty, product_name: req.body.product_name });
		Product.findOne({ product_name: req.body.product_name }).exec(function(err, product) {
			if (err) {
				console.log(err);
			} else if ((product.qty - req.body.order_qty) > 0) {
				var newQuant = product.qty - req.body.order_qty;
				console.log(newQuant);
				Product.findOneAndUpdate({ product_name: body.product_name }, { qty: newQuant });
			} else {
				res.json({ message: 'Out of stock!' });
			}
		});
		order.save(function(err) {
			if (err) {
				res.json(err);
			}
		});
	},
}