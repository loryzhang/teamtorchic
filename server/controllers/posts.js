const models = require('../models');
const { sortByRating, countLikes } = require('../utils');

module.exports = {
  getAll: async (req, res) => {
    try {
      let posts = await models.post.getAll();
      posts = JSON.parse(JSON.stringify(posts.rows));
      res.body = {};
      res.body.data = posts;
      const promises = posts.map((post) => {
        const { dishid } = post;
        return models.dishlikes.get(dishid);
      });
      return Promise.all(promises)
        .then((result) => {
          const data = countLikes(result);
          data.forEach((postData, i) => {
            res.body.data[i].upvoteUsers = postData.upvoteUsers;
            res.body.data[i].downvoteUsers = postData.downvoteUsers;
            res.body.data[i].votes = postData.votes;
          });
          res.json(res.body.data);
        })
        .catch((e) => {
          res.status(404).send(e);
        });
    } catch (e) {
      res.status(404).send(e);
    }
  },
  getByUsername: (req, res) => {
    const { username } = req.params;
    models.post.getByUsername(username)
      .then((results) => {
        results = JSON.parse(JSON.stringify(results.rows));
        res.body = {};
        res.body.data = results;
        const Promises = results.map((post) => {
          const { dishid } = post;
          return models.dishlikes.get(dishid);
        });
        return Promise.all(Promises);
      })
      .then((results) => {
        const data = countLikes(results);
        data.forEach((postData, i) => {
          res.body.data[i].upvoteUsers = postData.upvoteUsers;
          res.body.data[i].downvoteUsers = postData.downvoteUsers;
          res.body.data[i].votes = postData.votes;
        });
        res.json(res.body.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  getByDish: (req, res) => {
    const { dishname } = req.params;
    models.post.getByDish(dishname)
      .then((results) => {
        results = JSON.parse(JSON.stringify(results.rows));
        res.body = {};
        res.body.data = results;
        const Promises = results.map((post) => {
          const { dishid } = post;
          return models.dishlikes.get(dishid);
        });
        return Promise.all(Promises);
      })
      .then((results) => {
        const data = countLikes(results);
        data.forEach((postData, i) => {
          res.body.data[i].upvoteUsers = postData.upvoteUsers;
          res.body.data[i].downvoteUsers = postData.downvoteUsers;
          res.body.data[i].votes = postData.votes;
        });
        res.json(res.body.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  getByRestaurant: (req, res) => {
    const { name } = req.params;
    models.post.getByRestaurant(name)
      .then((results) => {
        results = JSON.parse(JSON.stringify(results.rows));
        res.body = {};
        res.body.data = results;
        const Promises = results.map((post) => {
          const { dishid } = post;
          return models.dishlikes.get(dishid);
        });
        return Promise.all(Promises);
      })
      .then((results) => {
        const data = countLikes(results);
        data.forEach((postData, i) => {
          res.body.data[i].upvoteUsers = postData.upvoteUsers;
          res.body.data[i].downvoteUsers = postData.downvoteUsers;
          res.body.data[i].votes = postData.votes;
        });
        res.body.data = sortByRating(res.body.data);
        res.json(res.body.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  getByRating: (req, res) => {
    models.post.getAll()
      .then((results) => {
        results = JSON.parse(JSON.stringify(results.rows));
        res.body = {};
        res.body.data = results;
        const Promises = results.map((post) => {
          const { dishid } = post;
          return models.dishlikes.get(dishid);
        });
        return Promise.all(Promises);
      })
      .then((results) => {
        const data = countLikes(results);
        data.forEach((postData, i) => {
          res.body.data[i].upvoteUsers = postData.upvoteUsers;
          res.body.data[i].downvoteUsers = postData.downvoteUsers;
          res.body.data[i].votes = postData.votes;
        });
        res.body.data = sortByRating(res.body.data);
        res.json(res.body.data);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  submit: (req, res) => {
    const data = req.body;
    const { dish, restaurant, likesdish } = req.body;
    if (likesdish === 'null') {
      data.likesdish = null;
    }
    if (req.file) {
      data.image = req.file.filename;
    } else {
      data.image = null;
    }
    const promises = [];
    promises.push(models.submit.dish(dish));
    if (restaurant !== '') {
      promises.push(models.submit.restaurant(restaurant));
    }
    Promise.all(promises)
      .then((results) => {
        data.dishid = results[0].rows[0].id;
        if (results[1]) {
          data.restaurantid = results[1].rows[0].id;
        }
        return data;
      })
      .then(results => models.submit.post(results))
      .then(results => res.json(results))
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
