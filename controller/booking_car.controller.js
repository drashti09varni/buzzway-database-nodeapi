const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const City = require('../models/booking_car.models');

exports.getCityBookinhg = catchAsync(async (req, res, next) => {
    try {
        const allCities = await City.find();

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

exports.AddCityName = catchAsync(async (req, res, next) => {

    const data = req.body;
    const { city_name } = data;
    try {
        if (!city_name) throw new Error('Category Name is required.');

        const existingCategory = await City.findOne({ city_name });

        if (existingCategory) {
            return res.status(400).json({
                status: 'fail',
                message: 'Category with the same name already exists.',
            });
        }

        data.id = `city-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;
        data.cart = data.cart || {};
        data.cart.id = `city-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;

        const user = await City.create(data);

        res.json({
            status: 'success',
            message: 'Category added successfully.',
            result: user
        });
    } catch (err) {
        let message;
        if (err.name === "MongoServerError" && err.code === 11000) message = "Url already exists. Please change url.";

        res.json({
            status: 'fail',
            message: message || err.message || 'Unknown error occur.',
            data: null,
        });
    }
});

exports.updateCityBooking = catchAsync(async (req, res, next) => {
    try {
        const cityId = req.params.id;
        const updatedData = req.body;

        const updatedCity = await City.findByIdAndUpdate(cityId, updatedData, { new: true });

        if (!updatedCity) {
            return res.status(404).json({
                status: 'fail',
                message: 'City not found.',
            });
        }
        res.json({
            status: 'success',
            message: 'City updated successfully.',
            data: updatedCity,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to update the city data.',
        });
    }
});


exports.deleteCityBooking = catchAsync(async (req, res, next) => {
    const cityId = req.params.id; // Assuming the city ID is passed in the URL

    try {
        const result = await City.deleteOne({ _id: cityId });

        if (result.deletedCount === 0) {
            return next(new AppError('City not found', 404));
        }

        res.json({
            status: 'success',
            message: 'City deleted successfully',
            data: null,
        });
    } catch (error) {
        return next(new AppError('Failed to delete city', 500));
    }
});