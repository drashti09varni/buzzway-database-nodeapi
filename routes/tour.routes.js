const router = require('express').Router();
const {addTour,uploadImage,edittour,uploadeditImage,deletetour,getTour} =  require('../controller/tour.controller');


router.post('/addtour', uploadImage,addTour);
router.patch('/edittour/:id',uploadeditImage,edittour);
router.delete('/deletetour/:id',deletetour);
router.get('/gettour',getTour)
                    
module.exports = router;    