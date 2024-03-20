const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carDetailsSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: `CAR-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`,
    },
    totalKm: {
        type: String
    },
    car_name:{
        type: String
    },
    baseFare: {
        type: String
    },
    tollTax: {
        type: String
    },
    stateTax: {
        type: String,
      },
      driverAllow: {
        type: String,
      },
    pessenger: {
        type: String
    },
    bags: {
        type: String
    },
    carImg: {
        type: [],
      },
      city_name:{
        type: String,
      }
},{timestamps: true});

const CarDetails = mongoose.model('cardetails', carDetailsSchema);

module.exports = CarDetails;