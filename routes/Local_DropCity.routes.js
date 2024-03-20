const router = require('express').Router();
const {addDropCity,getDropCity,updateDropCity,deleteDropCity} =  require('../controller/Local_DropCity.controller');


router.post('/addDropCity', addDropCity);
router.get('/allDropCity' , getDropCity);
router.post('/updateDropCity/:id',updateDropCity);
router.delete('/deleteDropCity/:id',deleteDropCity);

module.exports = router;    