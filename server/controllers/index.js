const reviews = require('./reviews');
const comments = require('./comments');
const users = require('./users');
const posts = require('./posts');
const dishes = require('./dishes');
const restaurants = require('./restaurants');
const dishLikes = require('./dishLikes');
const postLikes = require('./postLikes');

module.exports = {
  redirectSearch: (req, res) => {
    const { searchTerm, searchValue } = req.params;
    res.redirect(`/${searchTerm}/${searchValue}`);
  },
  reviews,
  postLikes,
  comments,
  dishes,
  restaurants,
  posts,
  dishLikes,
  users,
};
