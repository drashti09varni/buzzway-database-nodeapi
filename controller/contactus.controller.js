const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Contact = require('../models/contactus.models');

exports.addDetail = catchAsync(async (req, res, next) => {

    const data = req.body;
    const { name,phoneno,message,email } = data;
    
    if (!name) return next(new AppError('Name is required.', 400));
    if (!phoneno) return next(new AppError('Phone  is required.', 400));
    if (!message) return next(new AppError('Message is required.', 400));
    if(!email) return next(new AppError('Email is required', 400));

    const user = await Contact.create(data);

    res.json({
        status: 'success',
        message: 'Contact details added successfully.',
        result: user
    });
    res.json({
        status: 'fail',
        message: 'Contact details added successfully.',
        result: user
    });
});


exports.getContact = catchAsync(async (req, res, next) => {
    try {
        const allCities = await Contact.find(); // Query the database to get all cities

        res.json({
            status: 'success',
            data: allCities,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to retrieve data.',
        });
    } 
});