const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('flash');
const cookieParser = require('cookie-parser');
const router = require('./routes.js');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use('/images', express.static(path.join(__dirname, '/../images')));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/login', express.static(path.join(__dirname, '/../client/dist/login.html')));
app.use('/signup', express.static(path.join(__dirname, '/../client/dist')));
app.use(router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
