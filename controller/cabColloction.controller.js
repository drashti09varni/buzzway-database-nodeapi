const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Carcolltion = require('../models/cabColloction.models');
const multer = require('multer');   



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
exports.uploadImage = upload.single('carcabImg');

//add
exports.addCarcab = catchAsync(async (req, res, next) => {
    const data = req.body;
    const { luggage,pessenger,bus_rate, carcabImg, extra, carcab_name } = data;
      try{
      
    if (!luggage) throw new Error('Luggage is required.');
    if (!pessenger) throw new Error('Passenger is required.');
    if (!bus_rate) throw new Error('Bags is required.');
    // if (!carcabImg)throw new Error('car name is required.');
    if (!extra) throw new Error('Extra is required.');
    // if (!carcab_name) throw new Error('Car Cab Name is required.');

    const carcabImg = req.uploadedFileName;
   
    if (!carcabImg) throw new Error('Car Cab Image is required.');

    data.id = `CAB-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;
    data.cart = data.cart || {};
    data.cart.id = `CAB-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;

    const carDetails = await Carcolltion.create({ ...data, carcabImg });

    res.json({
        status: 'success',
        message: 'Car cab added successfully.',
        result: carDetails,
    });
}catch(err){
    let message;
    if (err.name === "MongoServerError" && err.code === 11000) message =  "Url already exists. Please change url.";
    res.json({
        status: 'fail',
        message: message || err.message || 'Unknown error occur.',
        data: null,
    });
}
});

//delete
exports.deleteCarcab = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);

    if (!id) {

        res.json({
            msg: 'No id is provided.',
            status: 'fail',

        });
    }
    const deleteData = await Carcolltion.findOneAndDelete({ id: id });
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
exports.getCarCabDetail = catchAsync(async (req, res, next) => {


    const product = await Carcolltion.find()

    res.json({
        status: 'success',
        message: 'Car Cab Details get successfully.',
        result: product,

    });
});


//update
exports.updateCarCabdetail = catchAsync(async (req, res, next) => {
    
    try {
        upload.single('carcabImg')(req, res, async (err) => {
          if (err) {
            console.error(err);
            return res.status(400).json({ error: 'Error uploading image' });
          }
          const updateData = {
            luggage:req.body.luggage,
            pessenger:req.body.pessenger,
            bus_rate: req.body.bus_rate,
            extra: req.body.extra,
            carcab_name: req.body.carcab_name,
          };
      
          // Check if an image was uploaded
          if (req.file) {
            // Save the image name in the "carImg" field
            updateData.carcabImg = req.file.originalname;
          }
      
          const update = await Carcolltion.findByIdAndUpdate(req.params.id, updateData);
      
          if (!update) {
            return res.status(404).json({ error: 'Car detail not found' });
          }
      
          const updatedProduct = await Carcolltion.findById(req.params.id).exec();
      
          // Include "carImg" in the response JSON
          res.json({
            status: 'success',
            message: 'Car cab edit successfully.',
            result: updatedProduct,
        });
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      
      
});