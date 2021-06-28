const mongoose = require('mongoose');

// email should match with db email with validator (npm install validator)
const { isEmail } = require('validator');

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

//fire a function after doc saved to db
userSchema.post('save', function(doc, next){
  console.log('new user was created & saved', doc);
  next();
});

// fire function before doc saved db. 'this' is local created user info
userSchema.pre('save', function(next){
  console.log('user about to be created & saved', this);
  next();
})

//connect to MongoDb collection 
const User = mongoose.model('user', userSchema);

module.exports = User;