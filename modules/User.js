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

//connect to MongoDb collection 
const User = mongoose.model('user', userSchema);

module.exports = User;