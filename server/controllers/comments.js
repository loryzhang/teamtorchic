const models = require('../models');

module.exports = {
  get: async (req, res) => {
    const { post } = req.query;
    try {
      res.json(await models.comments.get(post));
    } catch (e) {
      res.status(404).send(e);
    }
  },
  post: async (data, res) => {
    try {
      await models.comments.post(data.body);
      res.send('success');
    } catch (e) {
      res.status(401).send(e);
    }
  },
};
