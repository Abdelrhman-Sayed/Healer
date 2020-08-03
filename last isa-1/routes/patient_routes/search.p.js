
const express = require('express');
const router = express.Router();

const patientControllers = require('../../controllers/patients.controllers');

// search route
router.get('/',patientControllers.search);





module.exports= patientControllers;
module.exports=router;
