const Movie = require('../entities/Movie');

const { Op } = require('sequelize');

module.exports = {
  async index(request, response) {
    //try {
    const movieListAvailable = await Movie.findAll({
      where: { amount: { [Op.gt]: 0 } },
    });

    return response.status(200).json(movieListAvailable);

    // } catch (error) {
    //   return response.status(400).json(error);
    // }
  },
};
