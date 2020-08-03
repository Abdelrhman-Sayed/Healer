// ----   doc Auth route  ----//

const express = require('express');
const router = express.Router();

const doctorControllers =require('../../controllers/doctor.controllers');

// Register and login
router.post('/',doctorControllers.signup);






module.exports = doctorControllers;
module.exports = router;


