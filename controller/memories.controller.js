const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Memories = require('../models/memories.models');
const multer = require('multer');

//add memories
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/memories');
    },
    filename: function (req, file, cb) {
      const filename = file.originalname;
      cb(null, filename);
    },
  });
  
  const upload = multer({ storage: storage });
  exports.uploadImage = upload.single('memoriesImg');

  //edit memories 
  const editstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/memories');
    },
    filename: function (req, file, cb) {
      const filename = file.originalname;
      cb(null, filename);
    },
  });
  
  const editupload = multer({ storage: editstorage });
  exports.edituploadImage = editupload.single('memoriesImg');


  exports.addMemories = catchAsync(async (req, res, next) => {
    try {

        const data = {
            memoriesImg: req.file ? req.file.filename : null,
            memories_name:req.body.memories_name
          };

         console.log(data)
        const memories = await Memories.create(data);

        res.json({
          status: 'success',
          message: 'Memories added successfully.',
          result: memories,
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

exports.getmemories = catchAsync(async (req, res, next) => {
    try {
        const allmemories = await Memories.find(); 

        res.json({
            status: 'success',
            data: allmemories,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to retrieve data.',
        });
    } 
});


exports.deletememories = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
  
    if (!id) {
      return next(new Error('No id is provided!!'));
    }
    const deleteData = await Memories.findOneAndDelete({ _id: id });
    if (!deleteData) {
      return next(new Error('No product found with the provided id.', 404));
    }
  
    res.json({
      msg: 'delete successful!!',
      status: 'success',
      result: deleteData
    });
  });

  exports.editMemories = catchAsync(async (req, res, next) => {
    try {
      const updateData = {
       
        memoriesImg: req. file.filename,
      };
  
      const updatedTour = await Memories.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
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
  
  