const models = require('../models');

module.exports = async (req, res) => {
  try {
    res.json(await models.dishes());
  } catch (e) {
    res.status(401).send(e);
  }
};
