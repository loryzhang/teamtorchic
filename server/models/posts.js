const db = require('./postgreSql');

module.exports = {
  getAll: () => {
    const getAllPost = {
      text: 'select content, recipe, posts.id as postid, image, dishid, userid, restaurantid, likesdish, users.username, restaurants.name as restaurantname, dishes.name as dishname from posts inner join users on users.id = userid left join restaurants on restaurants.id = restaurantid inner join dishes on dishes.id = dishid where (posts.content IS NOT NULL) ORDER BY posts.id DESC',
    };
    return db.client.query(getAllPost);
  },
  getByUsername: (username) => {
    const getAllPostByUsername = {
      text: 'select content, posts.id as postid, image, dishid, userid, restaurantid, likesdish, users.username, restaurants.name as restaurantname, dishes.name as dishname from posts inner join users on users.id = userid inner join restaurants on restaurants.id = restaurantid inner join dishes on dishes.id = dishid where users.username = $1 and content IS NOT NULL ORDER BY posts.id DESC',
      values: [username],
    };
    return db.client.query(getAllPostByUsername);
  },
  getByDish: (dishname) => {
    const query = {
      text: 'select content, posts.id as postid, posts.image, dishid, userid, restaurantid, likesdish, users.username, restaurants.name as restaurantname, dishes.name as dishname from posts inner join users on users.id = userid inner join restaurants on restaurants.id = restaurantid inner join dishes on dishes.id = dishid where dishes.name LIKE $1 and (posts.content IS NOT NULL OR posts.image IS NOT NULL) ORDER BY posts.id DESC',
      values: [`%${dishname}%`],
    };
    return db.client.query(query);
  },
  getByRestaurant: (name) => {
    const query = {
      text: 'select content, posts.id as postid, image, dishid, userid, restaurantid, likesdish, users.username, restaurants.name as restaurantname, dishes.name as dishname from posts inner join users on users.id = userid inner join restaurants on restaurants.id = restaurantid inner join dishes on dishes.id = dishid where restaurants.name LIKE $1 and (posts.content IS NOT NULL OR posts.image IS NOT NULL) ORDER BY posts.id DESC',
      values: [`%${name}%`],
    };
    return db.client.query(query);
  },
};
