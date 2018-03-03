const models = require('../models');

module.exports = async (req, res) => {
  const data = req.query;
  try {
    res.json(await models.reviews(data).rows);
  } catch (e) {
    res.status(404).send(e);
  }
};
