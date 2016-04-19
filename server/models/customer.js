var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var customerSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true},
	created_at: {type: Date, default: Date.now}
});

customerSchema.plugin(uniqueValidator, { message: 'Error, {PATH} must be unique.' });
var Customer = mongoose.model('Customer', customerSchema);