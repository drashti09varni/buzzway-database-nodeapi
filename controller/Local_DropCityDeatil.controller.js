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
exports.addLocalDropCityDetails = catchAsync(async (req, res, next) => {
    try {
        const data = req.body;
        const { city_name, car_name, baseFare, driverAllow} = data;
      
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
exports.deleteLocalDropCity = catchAsync(async (req, res, next) => {
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
exports.getLocalDropCity = catchAsync(async (req, res, next) => {


    const product = await CarDetails.find()

    res.json({
        status: 'success',
        message: 'Car Details get successfully.',
        result: product,

    });
});

//update
exports.updateLocalDropCity = catchAsync(async (req, res, next) => {

    try {
        upload.single('carImg')(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ error: 'Error uploading image' });
            }

            const updateData = {
                car_name: req.body.car_name,
                city_name: req.body.city_name,
                totalKm: req.body.totalKm,
                baseFare: req.body.baseFare,
                tollTax: req.body.tollTax,
                stateTax: req.body.stateTax,
                driverAllow: req.body.driverAllow,
                amount: req.body.amount,
                pessenger: req.body.pessenger,
                bags: req.body.bags,

            };

            // Check if an image was uploaded
            if (req.file) {
                // Save the image name in the "carImg" field
                updateData.carImg = req.file.originalname;
            }
            const existingRecord = await CarDetails.findOne({ car_name: updateData.car_name, city_name:updateData.city_name });
            if (existingRecord) {
                return res.json({
                    status: 'fail',
                    message: 'City and car combination already exists.',
                });
            }
    
            const update = await CarDetails.findByIdAndUpdate(req.params.id, updateData);

            if (!update) {
                return res.status(404).json({ error: 'Car detail not found' });
            }

            const updatedProduct = await CarDetails.findById(req.params.id).exec();

            // Include "carImg" in the response JSON
            //           res.json(updatedProduct);
            //         });
            //       } catch (err) {
            //         console.error(err);
            //         res.status(500).json({ error: 'Internal Server Error' });
            //       }


            // });
            res.json({
                status: 'success',
                message: 'Car details update successfully.',
                result: updatedProduct,
            });
        });
        }catch (err) {
            let message;
            if (err.name === "MongoServerError" && err.code === 11000) message = "Url already exists. Please change url.";

            res.json({
                status: 'fail',
                message: message || err.message || 'Unknown error occur.',
                data: null,
            });
        }
    });

//   master : ip :159.65.152.243 usn : master_gxcnkztnyc ps:aa87RPbJ aa password che




