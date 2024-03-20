const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
	id: {
		type: String,
        required: true,
        default: `city-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`,
        unique: true,
        immutable: true
	},
	city_name: {
		type: String,
		unique: true,
	}
	
}, {timestamps: true});

const City = mongoose.model('booking_city_car', loginSchema);

module.exports = City;