var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	customer_name: { type: String, required: true },
	order_qty: { type: Number, required: true },
	product_name: { type: String, required: true },
	created_at: { type: Date, default: Date.now }
});

var Order = mongoose.model('Order', orderSchema);