const models = require('../models');

module.exports = {
  get: async (req, res) => {
    const data = req.query;
    try {
      let userLiked = false;
      const results = await models.likes.get(data);
      results.rows.forEach((row) => {
        if (row.userid === data.user) {
          userLiked = true;
        }
      });
      res.json({
        count: results.rows.length,
        usersLike: userLiked,
      });
    } catch (e) {
      res.status(404).send(e);
    }
  },
  post: async (req, res) => {
    const data = req.body;
    try {
      res.json(await models.likes.post(data));
    } catch (e) {
      res.status(401).send(e);
    }
  },
};
