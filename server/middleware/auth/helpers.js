const models = require('../../models');

module.exports = {
  findUser: async (profile, done) => {
    const { displayName } = profile;
    try {
      const results = await models.users.findByUsername(displayName);
      if (results.rowCount) {
        const { username } = results.rows[0];
        done(null, username);
      } else {
        try {
          await models.user.create(displayName, 'googleUsers');
          done(null, displayName);
        } catch (e) {
          done(e);
        }
      }
    } catch (e) {
      done(e);
    }
  },
  checkCredential: async (name, password, done) => {
    try {
      const results = await models.users.checkUserCredential(name, password);
      if (results.rowCount) {
        const { username } = results.rows[0];
        done(null, username);
      } else {
        done(null, false, { message: 'Incorrect username or password' });
      }
    } catch (e) {
      done(e);
    }
  },
  isLogin: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  },
};
