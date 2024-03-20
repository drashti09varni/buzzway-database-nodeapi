const router = require('express').Router();
const {addLocalDropCityDetails,uploadImage,deleteLocalDropCity,getLocalDropCity,updateLocalDropCity} =  require('../controller/Local_DropCityDeatil.controller');

router.post('/addcardetails', uploadImage, addLocalDropCityDetails);
router.delete('/deletecardetail/:id', deleteLocalDropCity);
router.get('/getcardetail', getLocalDropCity);
router.patch('/updatecardetail/:id', updateLocalDropCity);

module.exports = router;