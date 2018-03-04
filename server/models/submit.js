const db = require('./postgreSql');

module.exports = {
  dish: async (dish) => {
    const findDish = {
      text: 'select id from dishes where name = $1',
      values: [dish],
    };
    const createDish = {
      text: 'insert into dishes (name) values ($1) RETURNING id',
      values: [dish],
    };
    try {
      const result = await db.client.query(findDish);
      if (result.rowCount) {
        return result.rows[0].id;
      }
      try {
        const id = await db.client.query(createDish);
        return id.rows[0].id;
      } catch (e) {
        return e;
      }
    } catch (e) {
      return e;
    }
  },
  restaurant: async (restaurant) => {
    const findRestaurant = {
      text: 'select id from restaurants where name = $1',
      values: [restaurant],
    };
    const createRestaurant = {
      text: 'insert into restaurants (name) values ($1) RETURNING id',
      values: [restaurant],
    };
    try {
      const result = await db.client.query(findRestaurant);
      if (result.rowCount) {
        return result.rows[0].id;
      }
      try {
        const id = await db.client.query(createRestaurant).rows[0].id;
        return id.rows[0].id;
      } catch (e) {
        return e;
      }
    } catch (e) {
      return e;
    }
  },
  menu: (data) => {
    const { dishId, restaurantId } = data;
    const query = {
      text: 'insert into menus (dishId, restaurantId) values ($1, $2) ON CONFLICT DO NOTHING',
      values: [dishId, restaurantId],
    };
    return db.client.query(query);
  },
  post: (data) => {
    const {
      likesdish,
      userid, dishid,
      restaurantid,
      image,
      recipe,
    } = data;
    const content = data.content.replace("'", "''");
    const query = {
      text: 'insert into posts (content, likesDish, userId, dishId, restaurantId, image, recipe) values ($1, $2, $3, $4, $5, $6, $7)',
      values: [content, likesdish, userid, dishid, restaurantid, image, recipe],
    };
    return db.client.query(query);
  },
};
