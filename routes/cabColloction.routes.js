const router = require('express').Router();
const {addCarcab,uploadImage,deleteCarcab,getCarCabDetail,updateCarCabdetail} =  require('../controller/cabColloction.controller');

router.post('/addcardetailcab', uploadImage, addCarcab);
router.delete('/deletecarcab/:id', deleteCarcab);
router.get('/getcarcabdetail', getCarCabDetail);
router.patch('/updatecarcabdetail/:id', updateCarCabdetail);

module.exports = router;