const models = require('../models');

module.exports = {
  getProfile: async (req, res) => {
    const { username } = req.params;
    try {
      res.json(await models.users.getProfile(username));
    } catch (e) {
      res.status(401).send(e);
    }
  },
};
