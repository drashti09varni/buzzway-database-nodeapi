const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Blogs = require('../models/blog.models');
const multer = require('multer');

//add Blog Images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/blog');
    },
    filename: function (req, file, cb) {
      const filename = file.originalname;
      cb(null, filename);
    },
  });
  
  const upload = multer({ storage: storage });
  exports.uploadImage = upload.single('blog_img');

//edit Blog Images
  const editstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/blog');
    },
    filename: function (req, file, cb) {
      const filename = file.originalname;
      cb(null, filename);
    },
  });
  
  const editupload = multer({ storage: editstorage });
  exports.edituploadImage = editupload.single('blog_img');


  exports.addBlogs = catchAsync(async (req, res, next) => {
    try {

        const data = {
            blog_img: req.file ? req.file.filename : null,
            blog_name:req.body.blog_name,
            blog_description:req.body.blog_description

          };

         console.log(data)
        const blog = await Blogs.create(data);

        res.json({
          status: 'success',
          message: 'Blogs added successfully.',
          result: blog,
        });

      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

exports.getBlogs = catchAsync(async (req, res, next) => {
    try {
        const allBlogs = await Blogs.find(); 

        res.json({
            status: 'success',
            data: allBlogs,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to retrieve data.',
        });
    } 
});

exports.deleteBlogs = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
  
    if (!id) {
      return next(new Error('No id is provided!!'));
    }
    const deleteData = await Blogs.findOneAndDelete({ _id: id });
    if (!deleteData) {
      return next(new Error('No product found with the provided id.', 404));
    }
  
    res.json({
      msg: 'delete successful!!',
      status: 'success',
      result: deleteData
    });
  });

  exports.editBlogs = catchAsync(async (req, res, next) => {
    try {
        const { fieldToUpdate, newValue } = req.body;

        if (!fieldToUpdate || !newValue) {
            return res.status(400).json({ error: 'Field to update and new value are required' });
        }

        const updateData = {
            [fieldToUpdate]: newValue
        };

        const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({
            status: 'success',
            message: 'Blog updated successfully',
            data: updatedBlog,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
