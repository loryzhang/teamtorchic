const db = require('./postgreSql');

module.exports = ({ post, dish }) => {
  const query = {
    text: 'select posts.*, users.username, users.photo from posts LEFT JOIN users ON posts.userId=users.id WHERE posts.id!=$1 AND dishId=$2 AND posts.content IS NOT NULL ',
    values: [post, dish],
  };
  return db.client.query(query);
};
