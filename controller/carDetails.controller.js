const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const CarDetails = require('../models/carDetails.models');
const multer = require('multer'); // Import the Multer library


const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Use the original file name as the unique file name
        req.uploadedFileName = file.originalname; // Save the original file name to request
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
exports.uploadImage = upload.single('carImg');

//add
exports.addCarDetails = catchAsync(async (req, res, next) => {
    try {
        const data = req.body;
        const { city_name, car_name, totalKm, baseFare, tollTax, stateTax, driverAllow, amount, pessenger, bags } = data;

      
        // Check if the combination of city_name and car_name already exists
        const existingRecord = await CarDetails.findOne({ city_name, car_name });
        if (existingRecord) {
            return res.json({
                status: 'fail',
                message: 'City and car combination already exists.',
            });
        }

        // Perform other validations...

        // Extract the image file path from the request
        const carImg = req.uploadedFileName;
        if (!req.file) throw new Error('Image is required.');

        // Create a new CarDetails document with the data and image path
        const carDetails = await CarDetails.create({ ...data, carImg });

        res.json({
            status: 'success',
            message: 'Car details added successfully.',
            result: carDetails,
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


//delete
exports.deleteCarDetail = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // console.log(id);

    if (!id) {

        res.json({
            msg: 'No id is provided.',
            status: 'fail',

        });
    }

    const deleteData = await CarDetails.findOneAndDelete({ id: id });
    if (!deleteData) {
        res.json({
            msg: 'No product found with the provided id.',
            status: 'fail',

        });
    }

    res.json({
        msg: 'delete successful!!',
        status: 'success',
        result: deleteData
    });
})

//get
exports.getCarDetail = catchAsync(async (req, res, next) => {


    const product = await CarDetails.find()

    res.json({
        status: 'success',
        message: 'Car Details get successfully.',
        result: product,

    });
});

//update
exports.updateCardetail = catchAsync(async (req, res, next) => {
    try {
        const { fieldToUpdate, newValue } = req.body;

        if (!fieldToUpdate || !newValue) {
            return res.status(400).json({ error: 'Field to update and new value are required' });
        }

        const updateData = { [fieldToUpdate]: newValue };

        if (req.file) {
            updateData.carImg = req.file.originalname;
        }

        const updatedCarDetail = await CarDetails.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedCarDetail) {
            return res.status(404).json({ error: 'Car detail not found' });
        }

        res.json({
            status: 'success',
            message: 'Car detail updated successfully',
            data: updatedCarDetail,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//   master : ip :159.65.152.243 usn : master_gxcnkztnyc ps:aa87RPbJ aa password che




