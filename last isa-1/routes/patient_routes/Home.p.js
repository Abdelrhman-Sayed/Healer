

 // home page route //


const express = require('express');
const router = express.Router();

const patientControllers = require('../../controllers/patients.controllers');

// home route
router.get('/',patientControllers.home);





module.exports= patientControllers;
module.exports=router