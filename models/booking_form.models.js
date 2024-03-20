const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    
    name: {
        type: String,   
    },
    email:{
        type:String
    },
    date:{
        type:String
    },
    mobileno:{
        type:Number
    },
    message:{
        type:String
    }
}, { timestamps: true });

const booking = mongoose.model('booking', bookingSchema);

module.exports = booking;