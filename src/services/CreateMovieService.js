const Movie = require('../entities/Movie.js');

module.exports = {
  async create(request, response) {
    try {
      const { title, director, amount } = request.body;

      const newMovie = await Movie.create({
        title,
        director,
        amount,
      });

      return response.status(200).json(newMovie);
    } catch (error) {
      return response.status(400).json(error);
    }
  },
};
