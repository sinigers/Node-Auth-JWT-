const User = require('../modules/User');

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

// controller actions
module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.create({email, password});
        res.status(201).json(user);
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