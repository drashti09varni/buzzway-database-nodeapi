const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tour = require('../models/tour.model');
const multer = require('multer');

//add storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    cb(null, filename);
  },
  });
  
  const upload = multer({ storage: storage });
  exports.uploadImage = upload.single('tourImg');


//edit storage 
const updateStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    cb(null, filename);
  },
});

const uploadedit = multer({ storage: updateStorage });
exports.uploadeditImage = uploadedit.single('tourImg');




exports.addTour = catchAsync(async (req, res, next) => {
    const data = req.body;
    const { tour_name ,tour_description} = data;
        if (!tour_name) return next(new AppError('Tour Name is required.', 400));
        if (!tour_description) return next(new AppError('Tour Details is required.', 400));

    const existingCategory = await Tour.findOne({ tour_name ,tour_description});
    if (existingCategory) {
        return res.status(400).json({
            status: 'fail',
            message: 'Tour with the same name already exists.',
        });
    }
    
    if (req.file) {
        data.tourImg = req.file.filename; 
    }
    const user = await Tour.create(data);
    res.json({
        status: 'success',
        message: 'Taxi added successfully.',
        result: user
    });
});

exports.edittour = catchAsync(async (req, res, next) => {
  try {
    const updateData = {};

    // Check if tour_name field is provided in the request body and update it if available
    if (req.body.tour_name) {
      updateData.tour_name = req.body.tour_name;
    }

    // Check if tour_description field is provided in the request body and update it if available
    if (req.body.tour_description) {
      updateData.tour_description = req.body.tour_description;
    }

    // Check if tourImg file is uploaded and update the filename if available
    if (req.file && req.file.filename) {
      updateData.tourImg = req.file.filename;
    }

    // Find the tour document by ID and update only the specified fields
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedTour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    res.json({
      status: 'success',
      message: 'Tour updated successfully',
      data: updatedTour,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


exports.deletetour = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return next(new Error('No id is provided!!'));
  }
  const deleteData = await Tour.findOneAndDelete({ _id: id });
  if (!deleteData) {
    return next(new Error('No product found with the provided id.', 404));
  }

  res.json({
    msg: 'delete successful!!',
    status: 'success',
    result: deleteData
  });
});



exports.getTour = catchAsync(async (req, res, next) => {
  try {
      const allCities = await Tour.find(); 

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
