
const jwt = require('jsonwebtoken');
const patient =require('../models/patients.model');

const patientControllers ={};

//-- Register Handel --//

patientControllers.register = async (req,res,next ) =>
 {

    const { name , phone, email, gender, password , age }=req.body;

   const newpatient = new patient
   ({
        name ,
        phone,
        email,
        gender,
        age ,
        password
   })


   //--  email handel  --//

   try
    {
       const patient = await newpatient.save();
       return res.send({patient});

   }
   catch(er)
   {

    if (er.code === 11000 && er.name === 'MongoError')
    {
    var err=new Error(`Email address  ${newpatient.email} is already taken `);
    next(err);
    }

    else
    {
        next({message:'there is an error , please check your information again'});
    }
   }

};


//-- Login handel  --//

patientControllers.login = async (req, res, next) =>
 {
    // email  , password in request
    const { email , password } = req.body;

    try
    {
        //Retrieve user information
        const user = await patient.findOne({ email });


        if (!user.email )
            {
                const err = new Error(` email  ${ email} does not exist`);
                 err.status = 401;
                 next(err)
            }
            else
            {
                const message = {message:` Welcome  ${user.name} `};
                 return res.send(message)
            }

        // Check the password
        user.isPasswordMatch(password, patient.password, (success, _err) =>
         {
            if (success)
             {
                  // Generate JWT
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPRIATION;

                const token = jwt.sign({ _id: patient._id }, secret, { expiresIn: expire });
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

 // home page handel

 patientControllers.home = async (req,res,next ) =>
 {

    return res.json({ message: 'Welcome to Home page' });

};

 // --- search page--
 patientControllers.search = async (req,res,next ) =>
 {

    return res.json({ message: 'Welcome to serach page' });

};

//--- profile page ---//

patientControllers.profile = async (req,res,next ) =>
{

   return res.json({ message: 'Welcome to profile page' });

};

//--- sitting page --//
patientControllers.sitting = async (req,res,next ) =>
{

   const { name , phone, email, gender, password , age }=req.body;

  const newpatient = new patient
  ({
       name,
       phone,
       email,
       gender,
       age,
       password
  })

  return res.json({ message: 'Welcome to sitting page' });

};



module.exports = patientControllers ;
