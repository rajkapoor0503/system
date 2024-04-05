const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
 

 
router.post('/create',  companyController.createCompany);
router.get('/edit', companyController.editCompany);
router.put('/update', companyController.updateCompany);
router.get('/companylist', companyController.companylist);
module.exports = router;