const User = require('../modules/User');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

    //validation errors
    if (err.message.includes('user validation failed')) {
        //takes values of error object
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(properies);
            errors[properties.path] = properties.message;
        });
      }
    
      return errors;
    }

//create token

//token will be valid 3 days
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return  jwt.sign({ id }, 'net ninja secret', {
        expiresIn: maxAge
    });
}


// controller actions
module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
   
    //create new user
    try{
        const user = await User.create({email, password});
        const token = createToken(user._id);
        //create cookie with token
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ user: user._id });
    }
    catch(err){
        const errors = handleErros(err)
        res.status(400).json([{errors}]);
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

//    console.log(req.body); 
    res.send('user login');
}