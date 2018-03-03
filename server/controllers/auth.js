const models = require('../models');
const passport = require('../middleware/auth/passport.js');

module.exports = {
  checkSession: async (req, res) => {
    if (req.session.user) {
      const { user } = req.session;
      try {
        const result = await models.users.getUserId(user);
        const { id } = result.rows[0];
        res.json({ user, id });
      } catch (e) {
        res.status(500).send(e);
      }
    } else {
      res.json(null);
    }
  },
  signUp: async (req, res) => {
    const { username, password } = req.body;
    try {
      const results = await models.users.findByUsername(username);
      if (!results.rowCount) {
        try {
          await models.users.create(username, password);
          req.session.regenerate(() => {
            req.session.user = username;
            res.redirect('/');
          });
        } catch (e) {
          res.status(500).send(e);
        }
      } else {
        res.redirect('/login');
      }
    } catch (e) {
      res.status(500).send(e);
    }
  },
  logOut: (req, res) => {
    res.clearCookie();
    req.session.destroy(() => {
      req.logout();
      res.redirect('/');
    });
  },
  logIn: (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) { return next(err); }
      if (!user) {
        return res.redirect('/login');
      }
      return req.session.regenerate(() => {
        req.session.user = user;
        res.redirect('/');
      });
    })(req, res, next);
  },
  googleLogin: passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  googleLoginCallback: (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        return res.send(info);
      }
      req.session.regenerate(() => {
        req.session.user = user;
        res.redirect('/');
      });
    })(req, res, next);
  },
  isLogin: passport.isLogin,
};
