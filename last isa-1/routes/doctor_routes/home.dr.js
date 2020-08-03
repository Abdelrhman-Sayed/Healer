
// home page - profile  route

const express = require('express');

const router = express.Router();
const doctorControllers = require ('../../controllers/doctor.controllers');

 router.get('/',doctorControllers.homedr);




module.exports = doctorControllers ;
module.exports = router ;