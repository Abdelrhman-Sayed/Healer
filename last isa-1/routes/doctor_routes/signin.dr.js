
// ----   doc Auth route  ----//

const express = require('express');
const passport = require ('passport');
const router = express.Router();

const doctorControllers =require('../../controllers/doctor.controllers');


// the signin page
router.post('/',doctorControllers.signin);

// Customize auth message Protect the  routes
router.all('*', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            const error = new Error('You are not authorized to access this area');
            error.status = 401;
            throw error;
        }

        req.user = user;
        return next();
    })(req, res, next);

});
module.exports = doctorControllers ;
module.exports = router;



