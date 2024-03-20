const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    
    name: {
        type: String,   
    },
    phoneno:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    },
}, { timestamps: true });

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;