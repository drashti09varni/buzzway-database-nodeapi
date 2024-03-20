const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Local_DropCitySchema = new Schema({
	id: {
		type: String,
        required: true,
        default: `city-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`,
        unique: true,
        immutable: true
	},
	drop_city: {
		type: String,
		unique: true,
	}
	
}, {timestamps: true});

const dropCity = mongoose.model('drop_city', Local_DropCitySchema);

module.exports = dropCity;