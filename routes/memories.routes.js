const router = require('express').Router();
const {addMemories,uploadImage,getmemories,deletememories,edituploadImage,editMemories} =  require('../controller/memories.controller');


router.post('/addmemories', uploadImage,addMemories);
router.get('/getmemories',getmemories);
router.delete('/deletememories/:id',deletememories);
router.patch('/editmemories/:id', edituploadImage,editMemories);



module.exports = router;    