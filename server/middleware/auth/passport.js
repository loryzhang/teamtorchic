const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const helpers = require('./helpers');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.EATCHIC_CLIENT_ID || 'YOUR CLIENT ID HERE',
  clientSecret: process.env.EATCHIC_CLIENT_SECRET || 'YOUR CLIENT SECRET HERE',
  callbackURL: process.env.EATCHIC_CALLBACK_URL || 'YOUR CALLBACK URL HERE',
}, (accessToken, refreshToken, profile, done) => {
  helpers.findUser(profile, done);
}));
passport.use(new LocalStrategy((username, password, done) => {
  helpers.checkCredential(username, password, done);
}));
passport.isLogin = helpers.isLogin;

module.exports = passport;

