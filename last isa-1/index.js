const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const expressValidator = require('express-validator');
const logger = require ('morgan');
const passport = require('passport')
const patpassport = require('passport')
require('dotenv').config();



const app =express();

//--- port server connection ---//

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
{
    console.log(`Server is ready for connections on port ${PORT}`);
});

//--- mongo connection ---//

mongoose.connect( process.env.MONGO_DB_URL,
     {
         useNewUrlParser: true,
         useCreateIndex: true,
         useUnifiedTopology: true,
    });

mongoose.connection.on('connected', () =>
 {
    console.log('Connected to the database');
});
mongoose.connection.on('error', (err) =>
 {
    console.error(`Failed to connected to the database: ${err}`);
 });

//--- meddilwares ---//

app.use(logger('dev'));



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

  //doc passport
  app.use(passport.initialize());
  app.use(passport.session());
  require('./config_pass/passport')(passport);

     //patients passport
  app.use(patpassport.initialize());
  app.use(patpassport.session());
   require('./config_pass/patpassport')(patpassport);

// Doctor routes
const signup =require('./routes/doctor_routes/signup.dr');
const signin =require('./routes/doctor_routes/signin.dr');
const homedr =require('./routes/doctor_routes/home.dr');
const sittingdr =require('./routes/doctor_routes/setting.dr');

app.use('/',signup);
app.use('/',signin);
app.use('/',homedr);
app.use('/',sittingdr);

// patients routes
const register =require('./routes/patient_routes/register.p');
const login =require('./routes/patient_routes/login.p');
const home =require('./routes/patient_routes/Home.p');
const search =require('./routes/patient_routes/search.p');
const profile =require('./routes/patient_routes/profile.p');
const sitting =require('./routes/patient_routes/sitting.p');

app.use('/',register);
app.use('/',login);
app.use('/',home);
app.use('/',search);
app.use('/',profile);
app.use('/',sitting);


// ----------- ERRORS -----------//

app.use((req, res, next) =>
{
     //404 Not Found
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) =>
{
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';

    res.status(status).send
    ({
        error
    })
});


module.exports = app ;