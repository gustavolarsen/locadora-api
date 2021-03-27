const { Op } = require('sequelize');
const Rent = require('../entities/Rent');
const Movie = require('../entities/Movie.js');

module.exports = {
  async execute(request, response) {
    const idCustomer = request.idCustomer;
    const { idMovie } = request.params;

    const rent = await Rent.findOne({
      where: {
        [Op.and]: [
          { idMovie },
          { idCustomer },
          { returnDate: { [Op.is]: null } },
        ],
      },
    });

    if (!rent)
      return response.status(404).send({ message: 'Aluguel não encontrado.' });

    try {
      //busca o filme para obter a quantidade disponivel na locadora
      const movie = await Movie.findOne({ where: { id: idMovie } });

      await Movie.update(
        { amount: movie.amount + 1 },
        {
          where: {
            id: idMovie,
          },
        }
      );

      await Rent.update(
        { returnDate: new Date() },
        {
          where: {
            id: rent.id,
          },
        }
      );

      return response
        .status(200)
        .send(`Filme ${movie.title} devolvido com sucesso.`);
    } catch {
      throw new Error('Erro inesperado ao devolver o filme.');
    }
  },
};
