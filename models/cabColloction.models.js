const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carCabSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: `CAB-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`,
    },
    luggage: {
        type: String
    },
    pessenger: {
        type: String
    },
    bus_rate: {
        type: String
    },
    carcabImg: {
        type: [],
    },
    extra: {
        type: String,
    },
    carcab_name:{
        type:String
    }
}, { timestamps: true });

const Carcolltion = mongoose.model('carcab', carCabSchema);

module.exports = Carcolltion;