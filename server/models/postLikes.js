const db = require('./postgreSql');

module.exports = {
  get: ({ post }) => {
    const query = {
      text: 'select * from likes WHERE postId=$1',
      values: [post],
    };
    return db.client.query(query);
  },
  post: ({ user, post, likes }) => {
    let query;
    if (likes) {
      query = {
        text: 'insert into likes (userId, postId) values ($1, $2) RETURNING ID',
        values: [user, post],
      };
    } else {
      query = {
        text: 'delete from likes WHERE (userId=$1 AND postId=$2)',
        values: [user, post],
      };
    }
    return db.client.query(query);
  },
};
