const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../models/booking_form.models');

exports.addBookingDetail = catchAsync(async (req, res, next) => {
   const data = req.body;
    const { name,email,date,mobileno,message } = data;
    
    if (!name) return next(new AppError('Name is required.', 400));
    if (!email) return next(new AppError('Email is required.', 400));
    if (!date) return next(new AppError('Date is required.', 400));
    if (!mobileno) return next(new AppError('Mobile no is required.', 400));
    if (!message) return next(new AppError('Message is required.', 400));

    const user = await Booking.create(data);
    

    res.json({
        status: 'success',
        message: 'Booking details added successfully.',
        result: user
    });
});


exports.getBookings = catchAsync(async (req, res, next) => {
    try {
        const allCities = await Booking.find(); // Query the database to get all cities

        res.json({
            status: 'success',
            message:'Booking details get successfully.',
            data: allCities,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to retrieve data.',
        });
    } 
});