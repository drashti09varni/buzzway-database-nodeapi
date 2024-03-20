const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const DropCity = require('../models/Local_DropCity.models');

exports.getDropCity = catchAsync(async (req, res, next) => {
    try {
        const allCities = await DropCity.find();

        res.json({
            status: 'Get DropCity Data Successfully.',
            data: allCities,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to retrieve data.',
        });
    }
});

exports.addDropCity = catchAsync(async (req, res, next) => {

    const data = req.body;
    const { drop_city } = data;
    try {
        if (!drop_city) throw new Error('Drop City Name is required.');

        const existingCategory = await DropCity.findOne({ drop_city });

        if (existingCategory) {
            return res.status(400).json({
                status: 'fail',
                message: 'Category with the same name already exists.',
            });
        }

        data.id = `city-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;
        data.cart = data.cart || {};
        data.cart.id = `city-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;

        const user = await DropCity.create(data);

        res.json({
            status: 'success',
            message: 'Drop City added successfully.',
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

exports.updateDropCity = catchAsync(async (req, res) => {
    try {
        const cityId = req.params.id;
        const updatedData = req.body;

        const updatedCity = await DropCity.findByIdAndUpdate(cityId, updatedData, { new: true });

        if (!updatedCity) {
            throw new Error('City not found.');
        }

        res.json({
            status: 'success',
            message: 'Drop City Update successful.',
            result: updatedCity,
        });
    } catch (err) {
        let message;
        if (err.name === 'MongoServerError' && err.code === 11000) {
            message = 'Url already exists. Please change the URL.';
        } else if (!message) {
            message = err.message || 'Unknown error occurred.';
        }

        res.json({
            status: 'fail',
            message: message,
            data: null,
        });
    }
});

exports.deleteDropCity = catchAsync(async (req, res, next) => {
    const cityId = req.params.id; 
    try {
        const result = await DropCity.deleteOne({ _id: cityId });
        if (result.deletedCount === 0) {
            return next(new AppError('City not found', 404));
        }
        res.json({
            status: 'success',
            message: 'Drop City deleted successfully',
            data: null,
        });
    } catch (error) {
        return next(new AppError('Failed to delete city', 500));
    }
});