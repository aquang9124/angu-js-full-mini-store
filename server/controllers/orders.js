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

		Product.find({ product_name: req.body.product_name }).exec(function(err, product) {

			if (product[0].qty - req.body.order_qty >= 0) 
			{
				var newQty = product[0].qty - req.body.order_qty;

				Product.findOneAndUpdate({ product_name: req.body.product_name}, { qty: newQty }).exec(function(err) 
				{
					var order = new Order({ customer_name: req.body.customer_name, order_qty: req.body.order_qty, product_name: req.body.product_name });
					order.save(function(err)
					{
						if (err) 
						{
							res.json(err);
						} 
						else 
						{
							res.json({ status: true });
						}

					});

				});
			} 
			else 
			{
				res.json({ status: false });
			}
		});
		
	},
}