
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const _ = require('lodash');


const loginuserSchema = new Schema({
    email : {
        type : String,
        required : true
    } ,
    otp  : {
        type: String,
        required: true,
       
    },
    otpCreatedAt: { type: Date, default: Date.now }
}, {timestamps: true});


const Login = mongoose.model('login', loginuserSchema);

module.exports = Login;