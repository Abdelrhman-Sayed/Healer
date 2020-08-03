
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {Schema}= mongoose ;

const patientschema =Schema
({
    name: {type: String , require: true},
    email: {type: String , index: true, unique: true },
    age: {type: Date , requrire: true },
    phone: {type: Number , require: true},
    password: {type: String , require: true },

    gender: {
      // true = male
      // false = female
      type: Boolean,

      required: true,
      default: true
    },



})


patientschema.pre('save', async function(next)
 {
    //Check if password is not modified
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

// check is password mathch
patientschema.methods.isPasswordMatch = function(password, hashed, callback)
{

  bcrypt.compare(password, hashed, (_err, success) =>
   {
    if (_err)
    {
      return callback(_err);
    }
    callback(null, _err);
  });
};

// hide password
patientschema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const patient = mongoose.model('patient',patientschema);
module.exports=patient;
