const router = require('express').Router();
const {AddCityName,getCityBookinhg,updateCityBooking,deleteCityBooking} =  require('../controller/booking_car.controller');


router.post('/addCityBooking', AddCityName);
router.get('/allCityBooking' , getCityBookinhg);
router.post('/updateCityBooking/:id',updateCityBooking);
router.delete('/deleteCityBooking/:id',deleteCityBooking);

module.exports = router;    