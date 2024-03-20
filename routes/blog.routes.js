const router = require('express').Router();
const {addBlogs,uploadImage,getBlogs,deleteBlogs,edituploadImage,editBlogs} =  require('../controller/blog.controller');


router.post('/addBlogs', uploadImage,addBlogs);
router.get('/getBlogs',getBlogs);
router.delete('/deleteBlogs/:id',deleteBlogs);
router.patch('/editBlogs/:id', edituploadImage,editBlogs);


module.exports = router;