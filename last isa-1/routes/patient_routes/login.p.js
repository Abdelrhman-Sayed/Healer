

// ----   doc Auth route  ----//
const express = require('express');
const patpassport = require ('passport');
const router = express.Router();
const patientControllers =require('../../controllers/patients.controllers');



// the login page
router.post('/',patientControllers.login);

// Customize auth message Protect the  routes
router.all('*', (req, res, next) => {
    patpassport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            const error = new Error('You are not authorized to access this area');
            error.status = 401;
            throw error;
        }

        req.user = user;
        return next();
    })(req, res, next);

});
module.exports = patientControllers ;
module.exports=router;



