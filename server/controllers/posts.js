const models = require('../models');
const countVotes = require('./countVotes');

module.exports = {
  getAll: async (req, res) => {
    try {
      const posts = await models.posts.getAll();
      try {
        res.json(await countVotes(posts.rows));
      } catch (e) {
        res.status(500).send(e);
      }
    } catch (e) {
      res.status(404).send(e);
    }
  },
  getByUsername: async (req, res) => {
    const { username } = req.params;
    try {
      const posts = await models.posts.getByUsername(username);
      try {
        res.json(await countVotes(posts.rows));
      } catch (e) {
        res.status(500).send(e);
      }
    } catch (e) {
      res.status(404).send(e);
    }
  },
  getByDish: async (req, res) => {
    const { dishname } = req.params;
    try {
      const posts = await models.posts.getByDish(dishname);
      try {
        res.json(await countVotes(posts.rows));
      } catch (e) {
        res.status(500).send(e);
      }
    } catch (e) {
      res.status(404).send(e);
    }
  },
  getByRestaurant: async (req, res) => {
    const { name } = req.params;
    try {
      const posts = await models.posts.getByRestaurant(name);
      try {
        res.json(await countVotes(posts.rows));
      } catch (e) {
        res.status(500).send(e);
      }
    } catch (e) {
      res.status(404).send(e);
    }
  },
  getByRating: async (req, res) => {
    try {
      const posts = await models.posts.getAll();
      try {
        res.json(await countVotes(posts.rows, true));
      } catch (e) {
        res.status(500).send(e);
      }
    } catch (e) {
      res.status(404).send(e);
    }
  },
};
