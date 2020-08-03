// ----   doc Auth route  ----//

const express = require('express');
const router = express.Router();

const patientControllers = require('../../controllers/patients.controllers');

// Register route
router.post('/',patientControllers.register);





module.exports = patientControllers;
module.exports = router;
