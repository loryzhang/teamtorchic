const db = require('./postgreSql');
const posts = require('./posts');
const postLikes = require('./postLikes');
const dishLikes = require('./dishLikes');
const reviews = require('./reviews');
const comments = require('./comments');
const users = require('./users');
const submit = require('./submit');

db.client.connect();

module.exports = {
  posts,
  reviews,
  postLikes,
  dishes: () => db.client.query('select * from dishes'),
  restaurants: () => db.client.query('select * from restaurants'),
  comments,
  submit,
  dishLikes,
  users,
};
