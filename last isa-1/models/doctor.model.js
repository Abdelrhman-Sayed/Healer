
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {Schema}= mongoose ;

const doctorschema =Schema
({

    name: {type:String , require:true},
    email: {type:String, index: true, unique: true },
    password: {type: String, require: true },
    speciality: {type:String,requier:true },
    age :{type : String , requrire : true, default :new Date},
    gender: {
      // true = male
      // false = female
      type: Boolean,
      required: true,
      default: true
    },
    dr_phone: {type:Number , require:true , unique:true },
    about: {type:String, require:true },
    working_places: {type:String , require:true },
    shifts: {type:String, require:true},
    clinic_phone: {type:Number , require:true , unique:true },
    cost: {type:Number, require:true},

})

doctorschema.pre('save', async function(next)
 {
    // Check if password is not modified
    if (!this.isModified('password'))
    {
      return next();
    }

    //Encrypt the password
  try
    {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    }
   catch (er)
    {
    return next(er);
    }
});

// check is password mathch //
doctorschema.methods.isPasswordMatch = function(password, hashed, callback)
{
  bcrypt.compare(password, hashed, (_err, success) =>
   {
    if (_err)
    {
      return callback(_err);
    }
    callback(null, success);
  });
};

// hide password //
doctorschema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const doctor = mongoose.model('doctor',doctorschema);
module.exports=doctor;
