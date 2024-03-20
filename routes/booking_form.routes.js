const router = require('express').Router();
const {addBookingDetail,getBookings} =  require('../controller/booking_form.controller');


router.post('/addBooking', addBookingDetail);
router.get('/allBooking' , getBookings);


module.exports = router;