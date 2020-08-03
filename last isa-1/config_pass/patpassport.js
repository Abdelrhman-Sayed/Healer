

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// patient pass
const patient = require('../models/patients.model');


module.exports = (patpassport) =>
{
    let config = {};
    config.secretOrKey = process.env.JWT_SECRET;
    config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    patpassport.use(new JwtStrategy(config, async (jwtPayload, done) =>
     {
        try {



            const user = await patient.findById(jwtPayload._id);
            if (user)
            {
                return done(null, user);
            }
            else
            {
                return done(null, false);
            }
        }
        catch(e)
        {
            return done(err, false);
        }
    }));
};