const mongoose = require('mongoose');

// email should match with db email with validator (npm install validator)
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    // email shoud match with db email
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter an password'],
    minlength: [6, 'Minimum, password lenght is 6 charactesrs']
  }
});


// fire function before doc saved db. 'this' is local created user info
userSchema.pre('save', async function(next){
  // console.log('user about to be created & saved', this);

 //add 'salt befeore pass' and next hashing pass
 const salt = await bcrypt.genSalt();
 this.password = await bcrypt.hash(this.password, salt)
  next();
});

//static method to lofin user
userSchema.statics.login = async function(email, password){
  const user = await this.findOne({ email });
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user
    }
    throw Error('incorect password');
  }
  throw Error('incorect email');
}


//connect to MongoDb collection 
const User = mongoose.model('user', userSchema);

module.exports = User;