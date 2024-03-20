const router = require('express').Router();
const {addDetail,getContact} =  require('../controller/contactus.controller');


router.post('/adddetail', addDetail);
router.get('/alldetail' , getContact);


module.exports = router;