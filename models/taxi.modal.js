const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taxiSchema = new Schema({
	id: {
		type: String,
        required: true,
        default: `taxi-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`,
        unique: true,
        immutable: true
	},
	taxi_name: {
		type: String,
		unique: true,
	}
	
}, {timestamps: true});

const City = mongoose.model('taxi', taxiSchema);

module.exports = City;