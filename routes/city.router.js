const router = require('express').Router();
const {loginUser,getCity,updateCity,deleteCity} =  require('../controller/city.controller');


router.post('/addCity', loginUser);
router.get('/allCity' , getCity);
router.post('/updateCity/:id',updateCity);
router.delete('/deleteCity/:id',deleteCity);

module.exports = router;    