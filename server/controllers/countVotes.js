const models = require('../models');
const { sortByRating, countLikes } = require('./utils');

const getDishLikes = posts => posts.map(async (post) => {
  const { dishid } = post;
  try {
    const result = await models.dishLikes.get(dishid);
    return result;
  } catch (e) {
    return e;
  }
});

module.exports = async (posts, sort) => {
  try {
    const results = await Promise.all(await getDishLikes(posts));
    const data = countLikes(results);
    data.forEach((postData, i) => {
      posts[i].upvoteUsers = postData.upvoteUsers;
      posts[i].downvoteUsers = postData.downvoteUsers;
      posts[i].votes = postData.votes;
    });
    if (sort) {
      return sortByRating(posts);
    }
    return posts;
  } catch (e) {
    return e;
  }
};
