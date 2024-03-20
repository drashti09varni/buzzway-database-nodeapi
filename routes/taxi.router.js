const router = require('express').Router();
const {addTaxi,getTaxi,updateTaxi,deleteTaxi} =  require('../controller/taxi.controller');


router.post('/addTaxi', addTaxi);
router.get('/allTaxi' , getTaxi);
router.post('/updateTaxi/:id',updateTaxi);
router.delete('/deleteTaxi/:id',deleteTaxi);

module.exports = router;