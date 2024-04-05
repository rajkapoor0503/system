const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
 

 
router.post('/create',  jobController.createJob);
router.post('/edit', jobController.editJob);
router.get('/index', jobController.index);
router.get('/edit', jobController.editJob);
router.put('/update', jobController.updateJob);
 router.delete('/delete', jobController.deleteJob);
 
module.exports = router;