

// sitting page --//

const express = require('express');
const router = express.Router();

const doctorControllers = require ('../../controllers/doctor.controllers');


router.all('/',doctorControllers.sittingdr);




module.exports = doctorControllers ;
module.exports = router;