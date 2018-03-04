const models = require('../models');

module.exports = {
  get: async (req, res) => {
    const { dishId } = req.params;
    try {
      const results = await models.dishLikes.get(dishId);
      const data = {
        upvote: 0,
        downvote: 0,
      };
      results.rows.forEach((post) => {
        if (post.likesdish) {
          data.upvote += 1;
        } else {
          data.downvote += 1;
        }
      });
      res.json(data);
    } catch (e) {
      res.status(404).send(e);
    }
  },
  upVote: async (req, res) => {
    console.log('hehe');
    const {
      dishid, likesdish, userid, restaurantid,
    } = req.body;
    try {
      res.json(await models.dishLikes.upVote(dishid, likesdish, userid, restaurantid));
    } catch (e) {
      res.status(400).send(e);
    }
  },
  downVote: async (req, res) => {
    console.log('ha');
    const {
      dishid, likesdish, userid, restaurantid,
    } = req.body;
    try {
      res.json(await models.dishLikes.downVote(dishid, likesdish, userid, restaurantid));
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
