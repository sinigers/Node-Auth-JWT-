const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookieParser');


const app = express();

// middleware
app.use(express.static('public'));

//takes json on post req and parse itinto js object and attached it to req
app.use(express.json());

app.use(cookieParser());



// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://user:pass@cluster0.cqyh9.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

//cookies
app.get('/set-cookies', (req, res) => {
// //set cookie without cookieParseer
//   res.setHeader('Set-Cookie', 'newUser=true');

res.cookie('newUser', false);

// one day =  1000 * 60 * 60 * 24, after that will remove/expire cookie, secure - set cookie only on https, httpOnly- cant acces true jS front end ( in console - document.cookie)
// res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, secure: true});
res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
res.send('you got the cookies!');



});

app.get('/read-cookies', (req, res) => {
const cookies = req.cookies;
console.log(cookies.newUser);


res.json(cookies);
});