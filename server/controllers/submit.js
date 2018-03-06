const models = require('../models');

module.exports = async (req, res) => {
  const data = req.body;
  const { dish, restaurant, likesdish } = req.body;
  if (likesdish === 'null') {
    data.likesdish = null;
  }
  
  if (req.file) {
    data.image = req.file.location;
  } else {
    data.image = null;
  }
  data.dishid = await models.submit.dish(dish);
  if (restaurant.length) {
    data.restaurantid = await models.submit.restaurant(restaurant);
  }
  try {
    res.json(await models.submit.post(data));
  } catch (e) {
    res.status(404).send(e);
  }
};
