
const express = require('express');
const router = express.Router();

const patientControllers = require('../../controllers/patients.controllers');

// sitting route
router.all('/',patientControllers.sitting);





module.exports= patientControllers;
module.exports=router;












/* GET /app/logout -> function to logout from the system

router.get('/app/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.status(200).redirect('/');
});
*/