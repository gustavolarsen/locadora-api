const Movie = require('../entities/Movie.js');

module.exports = {
  async execute(request, response) {
    try {
      const { title, director, amount } = request.body;

      const newMovie = await Movie.create({
        title,
        director,
        amount,
      });

      return response.status(200).send(newMovie);
    } catch (error) {
      throw new Error('Erro inesperado ao cadastrar um filme.');
    }
  },
};
