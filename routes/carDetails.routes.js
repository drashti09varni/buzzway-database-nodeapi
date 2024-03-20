const router = require('express').Router();
const {addCarDetails,uploadImage,deleteCarDetail,getCarDetail,updateCardetail} =  require('../controller/carDetails.controller');

router.post('/addcardetails', uploadImage, addCarDetails);
router.delete('/deletecardetail/:id', deleteCarDetail);
router.get('/getcardetail', getCarDetail);
router.patch('/updatecardetail/:id', updateCardetail);

module.exports = router;