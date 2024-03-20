const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Taxi = require('../models/taxi.modal');

exports.getTaxi = catchAsync(async (req, res, next) => {
    try {
        const allCities = await Taxi.find(); // Query the database to get all cities

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

exports.addTaxi = catchAsync(async (req, res, next) => {
    const data = req.body;
    const { taxi_name } = data;
    
    if (!taxi_name) return next(new AppError('Taxi Name is required.', 400));

    const existingCategory = await Taxi.findOne({ taxi_name });

    if (existingCategory) {
        return res.status(400).json({
            status: 'fail',
            message: 'Taxi with the same name already exists.',
        });
    }

    data.id = `taxi-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;
    data.cart = data.cart || {};
    data.cart.id = `taxi-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;

    const user = await Taxi.create(data);

    res.json({
        status: 'success',
        message: 'Taxi added successfully.',
        result: user
    });
});

exports.updateTaxi = catchAsync(async (req, res, next) => {
    try {
        const cityId = req.params.id; 
        const updatedData = req.body; 

        const updatedTaxi = await Taxi.findByIdAndUpdate(cityId, updatedData, { new: true });

        if (!updatedTaxi) {
            return res.status(404).json({
                status: 'fail',
                message: 'Taxi not found.',
            });
        }

        res.json({
            status: 'success',
            message: 'Taxi updated successfully.',
            data: updatedTaxi,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to update the Taxi data.',
        });
    }
});


exports.deleteTaxi = catchAsync(async (req, res, next) => {
    const TaxiId = req.params.id; // Assuming the city ID is passed in the URL
  
    try {
      const result = await Taxi.deleteOne({ _id: TaxiId });
  
      if (result.deletedCount === 0) {
        return next(new AppError('Taxi not found', 404));
      }
  
      res.json({
        status: 'success',
        message: 'Taxi deleted successfully',
        data: null,
      });
    } catch (error) {
      return next(new AppError('Failed to delete Taxi', 500));
    }
  });