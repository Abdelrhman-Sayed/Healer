const passport = require('passport')
const jwt = require('jsonwebtoken');
const doctor =require('../models/doctor.model');

const doctorControllers ={};

// Register Hand

doctorControllers.signup = async (req,res,next ) =>
 {

    const { name , dr_phone , age , email , speciality , gender , password }=req.body;

   const newdoctor = new doctor
   ({
        name,
        dr_phone,
        age,
        email,
        speciality,
        gender,
        password
   })

   //  email handel
   try
    {
       const doctor = await newdoctor.save();
       return res.send({doctor});

   }
   catch(er)
   {

    if (er.code === 11000 && er.name === 'MongoError')
    {
    var err=new Error(`Email address  ${newdoctor.email} is already taken `);
    next(err);
    }

    else
    {
        next({message:'there is an error , please check your information again'});
    }
   }

};


// Login handel
doctorControllers.signin = async (req, res, next) =>
 {
    // email  , password in request
    const { email , password } = req.body;

    try
    {
        //Retrieve user information
        const user = await doctor.findOne({ email });

        if (!user.email )
            {
                const err = new Error(` email  ${ email} does not exist`);
                 err.status = 401;
                 next(err)
            }

            else
            {
                const message = {message:` Welcome Dr. ${user.name} `};
                 return res.send(message)
            }

        // Check the password
        user.isPasswordMatch(password, doctor.password, (success, _err) =>
         {
            if (success)
             {
                  // Generate JWT
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPRIATION;

                const token = jwt.signin({ _id: doctor._id }, secret, { expiresIn: expire });
                user.token = token;
                 return res.send({ user,token });
            }

            res.status(401).send({

                error: 'Invalid password'
            });
        });

    }catch(e)
    {
        next(e);
    }

};




// home-profile page handel


doctorControllers.homedr = async (req,res,next ) =>
 {

    return res.json({ message: 'Welcome to home page' });

 }


 // sitting page handel


doctorControllers.sittingdr = async (req,res,next ) =>
{

   const { name , dr_phone , speciality ,about , working_places , clinic_phone , shifts , cost }=req.body;

  const newdoctor = new doctor
  ({
       name ,
       dr_phone ,
       speciality ,
       about ,
       working_places ,
       clinic_phone ,
       shifts ,
       cost
    })

    return res.json({ message: 'Welcome to sitting page' });

}



module.exports = doctorControllers ;
