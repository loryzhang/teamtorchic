const db = require('./postgreSql');

module.exports = {
  post: (comment) => {
    const encodedComment = comment.comment.replace("'", "''");
    const { userId, postId } = comment;
    const query = {
      text: 'insert into comments (content, userId, postId) values ($1, $2, $3) RETURNING id',
      values: [encodedComment, userId, postId],
    };
    return db.client.query(query);
  },
  get: (post) => {
    const query = {
      text: 'select comments.*, users.username from comments left join users on comments.userId=users.id WHERE postId = $1',
      values: [post],
    };
    return db.client.query(query);
  },
};
