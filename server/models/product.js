var mongoose = require('mongoose');
var uniqueValidate = require('mongoose-unique-validator');

var productSchema = new mongoose.Schema({
	product_name: { type: String, required: true, unique: true },
	qty: Number,
	image_url: { type: String, required: true },
	description: String,
	created_at: { type: Date, default: Date.now }
});

productSchema.plugin(uniqueValidate, { message: 'Error, {VALUE} is not a unique product.' });
var Product = mongoose.model('Product', productSchema);