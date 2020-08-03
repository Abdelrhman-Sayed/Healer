
const express = require('express');
const router = express.Router();

const patientControllers = require('../../controllers/patients.controllers');

// profile route
router.get('/',patientControllers.profile);





module.exports= patientControllers;
module.exports=router;