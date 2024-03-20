const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carDetailsSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: `CAR-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`,
    },
    baseFare: {
        type: String
    },
    driverAllow: {
        type: String,
    },
    carImg: {
        type: [],
    },
    drop_city_name: {
        type: String
    }
}, { timestamps: true });

const CarDetails = mongoose.model('cardetails', carDetailsSchema);

module.exports = CarDetails;